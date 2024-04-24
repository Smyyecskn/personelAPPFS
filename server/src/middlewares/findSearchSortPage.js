"use strict";

module.exports = (req, res, next) => {
  let { filter, search, sort, page, limit, skip } = req?.query;

  filter = filter || {};

  search = search || {};

  for (let key in search) {
    search[key] = { $regex: search[key], $options: "i" }; // i: insensitive
  }

  sort = sort || {};

  limit = Number(limit);
  limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE || 20);

  page = Number(page);
  page = page > 0 ? page - 1 : 0;

  skip = Number(skip);
  skip = skip > 0 ? skip : page * limit;

  res.getModelList = async function (
    Model,
    customFilters = {},
    populate = null
  ) {
    return await Model.find({ ...customFilters, ...filter, ...search })
      .sort(sort)
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(limit)
      .populate(populate);
  };

  // Details:
  res.getModelListDetails = async (Model, customFilters = {}) => {
    const data = await Model.find({ ...customFilters, ...filter, ...search });

    let details = {
      filter,
      search,
      sort,
      skip,
      limit,
      page,
      pages: {
        previous: page > 0 ? page : false,
        current: page + 1,
        next: page + 2,
        total: Math.ceil(data.length / limit),
      },
      totalRecords: data.length,
    };
    details.pages.next =
      details.pages.next > details.pages.total ? false : details.pages.next;
    if (details.totalRecords <= limit) details.pages = false;
    return details;
  };

  next();
};

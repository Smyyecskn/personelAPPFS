import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuthCalls from "../services/useAuthCalls";

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuthCalls();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1  font-bold"
      >
        <NavLink
          to="/departments"
          style={({ isActive }) => {
            return {
              color: isActive ? "hotpink" : "black",
            };
          }}
          className="flex items-center"
        >
          Departments
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "hotpink" : "black",
            };
          }}
          to="/personnels"
          className="flex items-center"
        >
          Personnels
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "hotpink" : "black",
            };
          }}
          to="/admin"
          className="flex items-center"
        >
          Admin
        </NavLink>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full bg-blue-200 rounded-none  md:px-4 py-2 lg:px-12 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <NavLink
          to="/"
          className="mr-4 cursor-pointer py-1.5 font-bold animate-pulse text-pink-500 md:text-2xl"
        >
          Personnel Management
        </NavLink>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div>
            {!user?.email && (
              <div className="flex gap-2">
                {" "}
                <Button
                  variant="outlined"
                  size="md"
                  onClick={() => navigate("/login")}
                  className="hidden font-bold bg-white hover:bg-black hover:text-white w-[49%] lg:inline-block"
                >
                  <span>Log In</span>
                </Button>
                <Button
                  variant="outlined"
                  size="md"
                  className="hidden font-bold bg-white hover:bg-black hover:text-white w-[49%] lg:inline-block"
                  onClick={() => navigate("/signin")}
                >
                  <span>Register</span>
                </Button>
              </div>
            )}
            {user?.email && (
              <Button
                fullWidth
                variant="outlined"
                size="md"
                className="hidden font-bold bg-white hover:bg-black hover:text-white w-full lg:inline-block"
                onClick={() => logout()}
              >
                <span>Logout</span>
              </Button>
            )}
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        <div>
          {!user?.email && (
            <div className="flex gap-4">
              <Button
                onClick={() => navigate("/login")}
                fullWidth
                variant="outlined"
                size="sm"
                className="block bg-white  hover:bg-black hover:text-white w-[49%] lg:hidden"
              >
                <span>Log In</span>
              </Button>
              <Button
                fullWidth
                variant="outlined"
                size="sm"
                className="block bg-white hover:bg-black hover:text-white w-[49%] lg:hidden"
                onClick={() => navigate("/signin")}
              >
                <span>Register</span>
              </Button>
            </div>
          )}
          {user?.email && (
            <Button
              className="block bg-white hover:bg-black hover:text-white w-[49%] lg:hidden"
              fullWidth
              variant="gradient"
              size="sm"
              onClick={() => logout()}
            >
              <span>Logout</span>
            </Button>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}

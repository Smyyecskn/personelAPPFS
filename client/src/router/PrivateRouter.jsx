import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const { user } = useSelector((state) => state.auth);

  return user?.email && user?.password ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StickyNavbar } from "../components/Navbar";
import Home from "../pages/Home";
import Team from "../pages/Team";
import Login from "../pages/Login";
import Departments from "../pages/Departments";
import Personnels from "../pages/Personnels";
import PrivateRouter from "./PrivateRouter";
import SignIn from "../pages/SignIn";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <StickyNavbar />
      <Routes>
        <Route path="/" element={<PrivateRouter />}>
          <Route path="" element={<Home />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/personnels" element={<Personnels />} />
          <Route path="/team" element={<Team />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

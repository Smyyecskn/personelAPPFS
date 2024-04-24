/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";
import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";
import { loginSuccess, logoutSuccess } from "../features/authSlice";
import { useDispatch } from "react-redux";

const useAuthCalls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth)
  const { axiosWithToken, axiosPublic } = useAxios();
  const login = async (formValues) => {
    try {
      const { data } = await axiosPublic.post("/auth/login", formValues);
      dispatch(loginSuccess(data));
      navigate("/");
      toastSuccessNotify("Login Successful");
    } catch (error) {
      toastErrorNotify("Login Failed");
    }
  };
  const logout = async () => {
    try {
      await axiosWithToken.get("/auth/logout");
      dispatch(logoutSuccess());
      toastSuccessNotify("Logout Successful");
    } catch (error) {
      toastErrorNotify("Logout Failed");
    }
  };

  return { login, logout };
};

export default useAuthCalls;

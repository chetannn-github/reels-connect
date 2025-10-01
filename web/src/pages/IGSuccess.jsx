import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";

export const IGSuccess = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserAndSetToken = async(token) => {
    const userData = await api.get("/auth/me", token);
      dispatch(setAuth({ user: userData, token }));
      navigate("/dashboard");
  }

  useEffect(async () => {
    const params = new URLSearchParams(search);
    const token = params.get("token");
    localStorage.setItem("firework", "true");

    if (token) {
      localStorage.setItem("jwt", token);
      await fetchUserAndSetToken(token);
    }
  }, [search, dispatch, navigate]);

  return <div>Instagram connected!</div>;
};
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";

export const IGSuccess = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");
    localStorage.setItem("firework", "true");
    if (token) {
      localStorage.setItem("jwt", token);
      dispatch(setAuth({ user : null , token }));
      navigate("/dashboard");
    }
  }, [search, dispatch, navigate]);

  return <div>Instagram connected!</div>;
};
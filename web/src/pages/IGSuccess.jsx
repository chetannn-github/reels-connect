import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
import api from "../lib/api";
import { FullScreenLoader } from "../components/ui/FullScreenLoader";

export const IGSuccess = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserAndSetToken = async(token) => {
    const userData = await api.get("/auth/me", token);
      dispatch(setAuth({ user: userData, token }));
      navigate("/dashboard");
  }

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");
    localStorage.setItem("firework", "true");

    if (token) {
      localStorage.setItem("jwt", token);
      const fetchData = async () => {
      try {
        await fetchUserAndSetToken(token);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchData();
    }
  }, [search, dispatch, navigate]);

  return <FullScreenLoader variant="orbit" message="Welcome to InstaConnector" isVisible={true}/>
};
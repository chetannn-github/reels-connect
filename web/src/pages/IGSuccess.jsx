import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const IGSuccess = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");
    if (token) localStorage.setItem("jwt", token);
    navigate("/dashboard");

  }, [search]);

  return <div>Instagram connected!</div>;
};
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const IGSuccess = () => {
  const { search } = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");
    if (token) localStorage.setItem("jwt", token);
  }, [search]);

  return <div>Instagram connected!</div>;
};
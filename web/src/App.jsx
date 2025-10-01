import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";

import { IGSuccess } from "./pages/IGSuccess";
import { useDispatch, useSelector } from "react-redux";
import api from "./lib/api"
import { setAuth } from "./store/authSlice";
import { FullScreenLoader } from "./components/ui/FullScreenLoader";
import Plans from "./pages/Plans";
import AIAssistantSetup from "./pages/AISetup";
import DMAutomation from "./pages/DMAutomation/DMAutomation";
import Dashboard from "./pages/Dashboard";



function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
      const fetchUser = async () => {
        try {
          const token = localStorage.getItem("jwt");
          if(!token) return;
          
          const userData = await api.get("/auth/me", token);
          dispatch(setAuth({ user: userData, token }));
         
        } catch (err) {
          console.error("Failed to fetch user info:", err);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchUser();
  }, [dispatch]);

  if(isLoading) return <FullScreenLoader variant="orbit" message="Welcome to Reels Connect" isVisible={isLoading}/>
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ig-success" element={<IGSuccess />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/dm-automation" element={<ProtectedRoute ><DMAutomation/></ProtectedRoute>} />
        <Route path="/ai-setup" element={<ProtectedRoute ><AIAssistantSetup/></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute ><Dashboard/></ProtectedRoute>} />



      </Routes>
    </Router>
  );
}

export default App;



function ProtectedRoute({  children }) {
  const token = localStorage.getItem(token)
  return token ? children : <Navigate to="/" />;
}

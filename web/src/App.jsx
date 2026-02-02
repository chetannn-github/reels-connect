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
import Maintenance from "./pages/Maintainence";
import { useFeatureFlow }  from 'feature-flow-react-sdk';
import DiwaliTheme from "./components/FestiveThemes/DiwaliTheme";
import ChristmasTheme from "./components/FestiveThemes/ChristmasTheme";
import HalloweenTheme from "./components/FestiveThemes/HalloweenTheme";
import HoliTheme from "./components/FestiveThemes/HoliTheme";



function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const { data, loading } = useFeatureFlow("fZs259BrnMs73Z4K1n6AYIrJQ3N8SZJa");
  const [isLoading, setIsLoading] = useState(loading);
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [isDiwaliTheme, setIsDiwaliTheme] = useState(false);
  const [isChristmasTheme, setIsChristmasTheme] = useState(false);
  const [isHalloweenTheme, setIsHalloweenTheme] = useState(false);
  const [isHoliTheme, setIsHoliTheme] = useState(false);

  
  const checkFeatureFlagData = async() => {
    try {
      setIsLoading(true);
      if(data?.isMaintenance) setIsMaintenance(true);
      if(data?.isDiwaliTheme) setIsDiwaliTheme(true);
      if(data?.isChristmasTheme) setIsChristmasTheme(true);
      if(data?.isHalloweenTheme) setIsHalloweenTheme(true);
      if(data?.isHoliTheme) setIsHoliTheme(true);

    } catch (error) {
      
    }finally {
      setIsLoading(false);
    }
  }
  
  useEffect(()=> {
    checkFeatureFlagData();
  },[loading,data])
  
  useEffect(() => {
      const fetchUser = async () => {
        try {
          setIsLoading(true)
          const token = localStorage.getItem("jwt");
          if(!token) return;
          
          const userData = await api.get("/auth/me", token);
          dispatch(setAuth({ user: userData, token }));
         
        } catch (err) {
          console.error("Failed to fetch user info:", err);
        } finally {
          setIsLoading(loading);
        }
      };
  
      fetchUser();
  }, [dispatch]);

  
  if(isLoading) return <FullScreenLoader variant="orbit" message="Welcome to InstaConnector" isVisible={isLoading}/>
  if(isMaintenance) return <Maintenance/>
  return (
    <>
      <DiwaliTheme DIWALI_MODE={isDiwaliTheme} />
      <ChristmasTheme CHRISTMAS_MODE={isChristmasTheme}/>
      <HalloweenTheme HALLOWEEN_MODE={isHalloweenTheme}/>
      <HoliTheme HOLI_MODE={isHoliTheme}/>
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
     </>
  );
}

export default App;



function ProtectedRoute({  children }) {
  const token = localStorage.getItem("jwt")
  return token ? children : <Navigate to="/" />;
}

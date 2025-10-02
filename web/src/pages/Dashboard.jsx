import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../components/Dashboard/HeaderSection/Header';
import ReelsSection from '../components/Dashboard/ReelsSection/ReelsSection';
import ReelsAutomationSection from '../components/Dashboard/ReelsAutomationSection/ReelsAutomationSection';

import Fireworks from "../components/ui/Firework";
import { FullScreenLoader } from '../components/ui/FullScreenLoader';
import { useDashboardStore } from './Dashboard/useDashboardStore';

const Dashboard = () => {
  const {trigger, setTrigger} = useDashboardStore();

  useEffect(() => {
    if (localStorage.getItem("firework") === "true") {
      setTrigger(true);
      localStorage.removeItem("firework");
    }
    return () => {
      localStorage.removeItem("firework");
    }
  }, []);

  const user = useSelector((state) => state?.auth?.user);
  if(!user) return <FullScreenLoader variant="orbit" message="Welcome to InstaConnector" isVisible={!user}/>
  
  return (
    <div className="min-h-screen bg-background">
        <Fireworks trigger= {trigger}/>
        <Header/>
        <div className="max-w-7xl mx-auto md:px-6 py-8 space-y-8"> 
          <ReelsSection />
          <ReelsAutomationSection/>
        </div>

    </div>

  );
};

export default Dashboard;

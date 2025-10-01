import { useEffect } from 'react';
import Header from '../components/Dashboard/Header';
import ReelsSection from '../components/Dashboard/ReelsSection';
import KeywordSection from '../components/Dashboard/KeywordSection';
import AutomationSetup from '../components/Dashboard/AutomationSetup';
import CommentSetup from '../components/Dashboard/CommentSetup';
import SaveConfiguration from '../components/Dashboard/SaveConfiguration';
import SavedAutomation from '../components/Dashboard/SavedAutomation';
import Fireworks from "../components/ui/Firework";
import { useDashboardStore } from './Dashboard/useDashboardStore';


const Dashboard = () => {
  const {trigger, setTrigger} = useDashboardStore();
  useEffect(() => {
    if (localStorage.getItem("firework") === "true") {
      setTrigger(true);
      localStorage.removeItem("firework");
    }
  }, []);
    
  return (
    <div className="min-h-screen bg-background">
        <Fireworks trigger= {trigger}/>
        <Header/>
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8"> 
          <ReelsSection />
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto ">
            <KeywordSection />
            <SavedAutomation/>      
          </div>
        </div>

    </div>

  );
};

export default Dashboard;

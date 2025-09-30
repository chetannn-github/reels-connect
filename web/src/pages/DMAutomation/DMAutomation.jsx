import { useEffect } from 'react';

import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import Header from './components/Header';
import ExistingAutomations from './components/ExistingAutomations';
import CreateAutomation from './components/CreateAutomation';
import useDMAutomationStore from './hooks/useDMAutomation';
import { useNavigate } from 'react-router-dom';


const DMAutomation = () => {
  const navigate = useNavigate();
  const {fetchAutomations,isFetchingAutomation} = useDMAutomationStore();
  
  useEffect(() => {fetchAutomations(navigate); }, []);
  if(isFetchingAutomation) return <FullScreenLoader variant="orbit" message="Welcome to DM Automation" isVisible={isFetchingAutomation}/>

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <Header/>
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <CreateAutomation/>
          <ExistingAutomations />
        </div>
      </div>
    </div>
  );
};

export default DMAutomation;


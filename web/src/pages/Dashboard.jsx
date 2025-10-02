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
import AIAutomation from '../components/Dashboard/AiAutomation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Hash, Sparkles, Video } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { useSelector } from 'react-redux';


const Dashboard = () => {
  const {trigger, setTrigger, selectedReel} = useDashboardStore();
  useEffect(() => {
    if (localStorage.getItem("firework") === "true") {
      setTrigger(true);
      localStorage.removeItem("firework");
    }
  }, []);
  
  const user = useSelector((state) => state.auth.user);
  const hasAIPro = user?.plan === "premium";
  return (
    <div className="min-h-screen bg-background">
        <Fireworks trigger= {trigger}/>
        <Header/>
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8"> 
          <ReelsSection />
          {selectedReel ? (
            <div className="grid gap-8 max-w-7xl mx-auto ">
              {hasAIPro ? (
                <Tabs defaultValue="keyword" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 h-10 mb-4">
                    <TabsTrigger value="keyword" className="text-sm">
                      <Hash className="w-4 h-4 mr-2" />
                      Keyword Automation
                    </TabsTrigger>
                    <TabsTrigger value="ai" className="text-sm">
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI Automation
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="keyword" className="grid lg:grid-cols-2 gap-3">
                    <KeywordSection />
                    <SavedAutomation />
                  </TabsContent>

                  <TabsContent value="ai" className=" ">
                    <AIAutomation reelId={selectedReel} />
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="space-y-4">
                  <KeywordSection />
                  <SavedAutomation />
                </div>
              )}
            </div>
          ) : (
            <Card className="glass-effect card-shadow">
                <CardContent className="text-center py-12">
                    <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Select a Reel to Automate</h3>
                    <p className="text-muted-foreground">
                        Choose a reel from above to set up keyword-based automation
                    </p>
                </CardContent>
            </Card>
          )}

        </div>

    </div>

  );
};

export default Dashboard;

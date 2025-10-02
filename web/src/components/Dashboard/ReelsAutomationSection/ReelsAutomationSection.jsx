import { useSelector } from 'react-redux';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/Tabs';
import { Hash, Sparkles, Video } from 'lucide-react';
import KeywordAutomation from './KeywordAutomation/KeywordAutomation';
import AIAutomation from './AiAutomation';
import { Card, CardContent } from '../../ui/Card';
import { useDashboardStore } from '../../../pages/Dashboard/useDashboardStore';

function ReelsAutomationSection() {
    const user = useSelector((state) => state.auth.user);
    const hasAIPro = user?.plan === "premium";
    const { selectedReel } = useDashboardStore();
    return (
        <>
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
                        <KeywordAutomation />
                    </TabsContent>

                    <TabsContent value="ai" className=" ">
                        <AIAutomation reelId={selectedReel} />
                    </TabsContent>
                    </Tabs>
                ) : (
                    <div className="space-y-4">
                        <KeywordAutomation />
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
        </>
    )
}

export default ReelsAutomationSection
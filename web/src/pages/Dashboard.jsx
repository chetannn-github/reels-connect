import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../lib/api";
import { setAuth } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Badge } from "../components/ui/Badge";
import { Textarea } from "../components/ui/Textarea";
import { Switch } from "../components/ui/Switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";

import { Play, Plus, Trash2, MessageCircle, Users, Target, Zap, Clock, Loader2, Video, Crown, BarChart3 } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { PLAN_TO_LABEL, sleep } from "../lib/constant";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [selectedReel, setSelectedReel] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [messageTemplate, setMessageTemplate] = useState("");
  const [automationEnabled, setAutomationEnabled] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [isAddingKeyword, setIsAddingKeyword] =  useState(false);
  const [removingKeywordID,setRemovingKeywordID] = useState(null);

  const [analytics, setAnalytics] = useState({})
  const [selectedTab, setSelectedTab] = useState("setup");

  useEffect(() => {
    const fetchUserAndAnalytics = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) return navigate("/");

        const userData = await api.get("/reels", token);
        dispatch(setAuth({ user: userData, token }));
        setKeywords(userData?.keywords || []);
        setMessageTemplate(userData?.messageTemplate || "");
        setSelectedReel(userData?.reels[0]?.reelId);

        const analyticsRes = await api.get("/analytics", token);
        setAnalytics(analyticsRes)
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndAnalytics();
  }, [dispatch, navigate]);

  const addKeyword = async() => {
    setIsAddingKeyword(true)
    await sleep(0.4);

    const kw = newKeyword.trim().toLowerCase();
    if (kw && !keywords.includes(kw)) {
      setKeywords([...keywords, kw]);
      setNewKeyword("");  
    }
    setIsAddingKeyword(false);
  };

  const removeKeyword = async(kw) => {
    setRemovingKeywordID(kw)
    await sleep(0.4);
    setKeywords(keywords.filter(k => k !== kw));
    setRemovingKeywordID(null)
  };


  useEffect(() => {
    if (!selectedReel) return;
    const reel = user.reels.find(r => r.reelId === selectedReel);
    if (reel) {
      setKeywords(reel.keywords || []);
      setMessageTemplate(reel.message || "");
      setAutomationEnabled(reel.isActive || false);
    }
  }, [selectedReel, user?.reels]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await sleep(1);
      const token = localStorage.getItem("jwt");
      if (!token) return navigate("/");

      let res  = await api.post(`/keywords`, {
        reelId : selectedReel,
        keywords,
        message: messageTemplate,
        isActive : automationEnabled
      }, token);
      if(res.error) console.log(res.error);
      dispatch(setAuth({user : res.user, token}));

    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to update reel.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const toggleAutomation = () => {
    setAutomationEnabled(!automationEnabled);
  };


 

  useEffect(() => {
    const savedTab = localStorage.getItem("selectedTab");
    if (savedTab) setSelectedTab(savedTab);
    
    return () => {
      localStorage.removeItem("selectedTab");
    };
  }, []);

  // Save to localStorage whenever tab changes
  const handleTabChange = (value) => {
    setSelectedTab(value);
    localStorage.setItem("selectedTab", value);
  };

 

  if (loading) return <div className="text-center py-20 text-xl">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-10">
        {/* User Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Username */}
          <Card className="glass-effect border border-gray-200 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="text-2xl font-bold">@{user.username}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </CardContent>
          </Card>

          {/* Followers */}
          <Card className="glass-effect border border-gray-200 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Followers</p>
                <p className="text-2xl font-bold">{user.followers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>

          {/* Posts */}
          <Card className="glass-effect border border-gray-200 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Posts</p>
                <p className="text-2xl font-bold">{user.postCount}</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>

          {/* Total Messages Sent */}
          <Card className="glass-effect border border-gray-200 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Messages Sent</p>
                <p className="text-2xl font-bold">{user.messagesSent || 0}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-orange-600" />
            </CardContent>
          </Card>

          {/* Active Reels Count */}
          <Card className="glass-effect border border-gray-200 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Reels</p>
                <p className="text-2xl font-bold">{user.activeReelsCount || 0}</p>
              </div>
              <Video className="h-8 w-8 text-red-600" /> 
            </CardContent>
          </Card>

          {/* Current Plan */}
          <Card className="glass-effect border border-gray-200 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Plan</p>
                <p className="text-2xl font-bold">{PLAN_TO_LABEL[user.plan] || "Free"}</p>
              </div>
              <Crown className="h-8 w-8 text-yellow-600" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Campaign Setup */}
          <div className="lg:col-span-2">
            <Tabs  className="space-y-6" onValueChange={handleTabChange} value={selectedTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="setup">Campaign Setup</TabsTrigger>
                <TabsTrigger value="triggered-reels">Triggered Reels</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
               
              </TabsList>

              <TabsContent value="setup" className="space-y-6">
                {/* Reels Selection */}
                <Card className="glass-effect border border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-5 w-5 text-primary" /> Select Instagram Reel
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-3">
                    {user.reels.map((reel) => (
                      <div
                        key={reel.reelId}
                        className={`cursor-pointer rounded-lg border-2 p-3 transition-all ${
                          selectedReel === reel.reelId
                            ? 'border-primary shadow-lg'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedReel(reel.reelId)}
                      >
                         
                          <img
                            src={ reel.thumbnailURL || reel.mediaURL}
                            alt={reel.reelTitle || "Reel"}
                            className="w-full h-32 object-cover rounded-md mb-3"
                          />
                        
                        <h4 className="font-medium text-sm text-foreground mb-2">{reel.reelTitle || "Untitled"}</h4>
                        <p className="text-xs text-muted-foreground mb-1">{reel.message || "No message"}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Keywords */}
                <Card className="glass-effect border border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" /> Trigger Keywords
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter keyword..."
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                      />
                      <Button onClick={addKeyword} size="sm">
                        {!isAddingKeyword && <Plus className="h-4 w-4" />}
                        {isAddingKeyword && <Loader2 className="h-4 w-4 animate-spin" />}
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((kw, i) => (
                        <Badge key={i} className="flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary/20">
                          {kw}
                          <button onClick={() => removeKeyword(kw)}>
                            {removingKeywordID !== kw && <Trash2 className="h-3 w-3" />}
                            {removingKeywordID === kw && <Loader2 className="h-3 w-3 animate-spin" />}
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Message Template */}
                <Card className="glass-effect border border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-primary" /> Auto-Reply Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label htmlFor="message">Message Template</Label>
                    <Textarea
                      id="message"
                      value={messageTemplate}
                      onChange={(e) => setMessageTemplate(e.target.value)}
                      rows={4}
                      className="mt-2"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="triggered-reels" className="space-y-6">
                <Card className="glass-effect border border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-5 w-5 text-primary" /> Active (Triggered) Reels
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-3">
                    {user.reels.filter(reel => reel.isActive).length === 0 ? (
                      <p className="text-muted-foreground text-sm">No active reels found.</p>
                    ) : (
                      user.reels
                        .filter(reel => reel.isActive)
                        .map((reel) => (
                          <div
                            key={reel.reelId}
                            className={`cursor-pointer rounded-lg border-2 p-3 transition-all ${
                              selectedReel === reel.reelId
                                ? "border-primary shadow-lg"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => setSelectedReel(reel.reelId)}
                          >
                            <img
                              src={reel.thumbnailURL || reel.mediaURL}
                              alt={reel.reelTitle || "Reel"}
                              className="w-full h-32 object-cover rounded-md mb-3"
                            />
                            <h4 className="font-medium text-sm text-foreground mb-2">
                              {reel.reelTitle || "Untitled"}
                            </h4>
                            <p className="text-xs text-muted-foreground mb-1">
                              {reel.message || "No message"}
                            </p>
                          </div>
                        ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>


             <TabsContent value="analytics" className="space-y-6">
                <Card className="glass-effect border border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" /> Comments Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                    {analytics?.data?.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-4 rounded-lg border p-4 shadow hover:shadow-lg transition-all"
                      >
                        {/* Reel Thumbnail as Circle */}
                        <img
                          src={item.reel.thumbnailURL || item.reel.mediaURL}
                          alt="Reel Thumbnail"
                          className="w-16 h-16 rounded-full object-cover border"
                        />

                        {/* Details */}
                        <div className="flex-1">
                          {/* Commenter */}
                          <h4 className="font-semibold text-sm mb-1">@{item.commentor}</h4>

                          {/* Comment Text */}
                          <p className="text-sm text-gray-700 mb-1">Comment : {item.commentText}</p>

                          {/* DM Info */}
                          {item.dmSent ? (
                            <p className="text-xs text-green-600">
                              DM Sent: "{item.dmMessage}"
                            </p>
                          ) : (
                            <p className="text-xs text-red-600">❌ DM Not Sent</p>
                          )}

                          {/* Time */}
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(item.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>



            </Tabs>
          </div>

           {/* Control Panel */}
          <div className="space-y-6">
            {/* Automation */}
            <Card className="glass-effect border border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" /> Automation Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">
                      {automationEnabled ? "Campaign Active" : "Campaign Paused"}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {automationEnabled ? "Automatically responding to comments" : "Click to start automation"}
                    </p>
                  </div>
                  <Switch checked={automationEnabled} onCheckedChange={toggleAutomation} />
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-glow transition-all duration-300"
              disabled={!selectedReel || keywords.length === 0}
              onClick = {handleSave}
            >
              {isSaving && <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>}

              {!isSaving && <>Save Campaign</>}
            </Button>
          </div>      
      
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import { Bot, Brain, Crown, MessageCircle, Sparkles, Target, Users, Video } from "lucide-react"
import { useSelector } from "react-redux";
import { Card, CardContent } from "../../ui/Card";
import { PLAN_TO_LABEL } from "../../../lib/constant";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const isLimitReached = (
    (user?.plan === "free" && (user?.messagesSent || 0) >= 10) ||
    (user?.plan === "basic" && (user?.activeReelsCount || 0) >= 30)
  );
  return (
    <div className="border-b border-border/50  top-0 z-10">
      <div className="max-w-7xl mx-auto md:px-6 md:py-4 ">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl  md:text-2xl font-bold text-foreground text-left">Reel Automation Dashboard</h1>
            <p className="text-muted-foreground text-sm md:text-sm text-left">Set up keyword-based automation for your Instagram reels</p>
          </div>
        </div>

        <div className="grid gap-3 md:gap-6 grid-cols-2  lg:grid-cols-4 mb-8">
          <Card className="glass-effect border border-gray-200 shadow-lg">
            <CardContent className="min-h-[88px] md:p-6 px-2 py-6 flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Username</p>
                <p className="text-sm md:text-2xl font-bold">@{user?.username}</p>
              </div>
              <Users className="h-5 w-5 md:h-8 md:w-8 text-purple-600" />
            </CardContent>
          </Card>

          {/* Followers */}
          <Card className="glass-effect border border-gray-200 shadow-lg">
            <CardContent className="min-h-[88px] md:p-6 px-2 py-6 flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Followers</p>
                <p className="text-sm md:text-2xl font-bold">{user?.followers}</p>
              </div>
              <Users className="h-5 w-5 md:h-8 md:w-8 text-blue-600" />
            </CardContent>
          </Card>

          {/* Posts */}
          <Card className="glass-effect border border-gray-200 shadow-lg">
            <CardContent className="min-h-[88px] md:p-6 px-2 py-6 flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Posts</p>
                <p className="text-sm md:text-2xl font-bold">{user?.postCount}</p>
              </div>
              <Target className="h-5 w-5 md:h-8 md:w-8 text-green-600" />
            </CardContent>
          </Card>

          {/* Total Messages Sent */}
          <Card className="glass-effect border border-gray-200 shadow-lg">
            <CardContent className="min-h-[88px] md:p-6 px-2 py-6 flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Total Messages Sent</p>
                <p className="text-sm md:text-2xl font-bold">{user?.messagesSent || 0}</p>
              </div>
              <MessageCircle className="h-5 w-5 md:h-8 md:w-8 text-orange-600" />
            </CardContent>
          </Card>

          {/* Active Reels Count */}
          <Card className="glass-effect border border-gray-200 shadow-lg">
            <CardContent className="min-h-[88px] md:p-6 px-2 py-6 flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Active Reels</p>
                <p className="text-sm md:text-2xl font-bold">{user?.activeReelsCount || 0}</p>
              </div>
              <Video className="h-5 w-5 md:h-8 md:w-8 text-red-600" /> 
            </CardContent>
          </Card>

          {/* Current Plan */}
          <Card className="glass-effect border border-gray-200 shadow-lg">
            <CardContent className="min-h-[88px] md:p-6 px-2 py-6 flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Current Plan</p>
                <p className="text-sm md:text-2xl font-bold">{PLAN_TO_LABEL[user?.plan] || "Free"}</p>
              </div>
              <Crown className="h-5 w-5 md:h-8 md:w-8 text-yellow-600" />
            </CardContent>
          </Card>

          {isLimitReached && (
              <Card
                onClick={() => navigate("/plans")}
                className="cursor-pointer bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xl hover:scale-105 transition-transform"
              >
                <CardContent className="min-h-[88px] md:p-6 px-2 py-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Limit Reached 🚀</p>
                    <p className="text-sm md:text-2xl font-bold">Upgrade Your Plan</p>
                  </div>
                  <Crown className="h-10 w-10 text-yellow-300" />
                </CardContent>
            </Card>
          )}

<Card 
  className="rounded-2xl border shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform backdrop-blur-sm cursor-pointer" 
  onClick={() => navigate("/dm-automation")}
>
  <CardContent className="min-h-[80px] sm:min-h-[88px] md:p-6 p-2 flex items-center justify-between">
    <div>
      <p className="text-xs sm:text-sm text-muted-foreground">Access</p>
      <p className="text-sm sm:text-lg md:text-xl font-semibold">Automation Hub</p>
    </div>
    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center ring-2 shadow">
      <Bot className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
    </div>
  </CardContent>
</Card>

<Card 
  className="rounded-2xl border shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform backdrop-blur-sm cursor-pointer" 
  onClick={() => navigate("/ai-setup")}
>
  <CardContent className="min-h-[80px] sm:min-h-[88px] md:p-6 p-2 flex items-center justify-between">
    <div>
      <p className="text-xs sm:text-sm text-muted-foreground">Setup</p>
      <p className="text-sm sm:text-lg md:text-xl font-semibold">AI Assistant</p>
    </div>
    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-pink-500 to-red-500 flex items-center justify-center ring-2 shadow">
      <Brain className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
    </div>
  </CardContent>
</Card>

          
        </div>
      </div>
    </div>
  )
}

export default Header
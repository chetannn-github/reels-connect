import { Crown, MessageCircle, Sparkles, Target, Users, Video } from "lucide-react"
import { useSelector } from "react-redux";
import { Card, CardContent } from "../ui/Card";
import { PLAN_TO_LABEL } from "../../lib/constant";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="border-b border-border/50  top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 ">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reel Automation Dashboard</h1>
            <p className="text-muted-foreground text-sm">Set up keyword-based automation for your Instagram reels</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="glass-effect border border-gray-200 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="text-2xl font-bold">@{user?.username}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </CardContent>
          </Card>

          {/* Followers */}
          <Card className="glass-effect border border-gray-200 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Followers</p>
                <p className="text-2xl font-bold">{user?.followers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>

          {/* Posts */}
          <Card className="glass-effect border border-gray-200 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Posts</p>
                <p className="text-2xl font-bold">{user?.postCount}</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>

          {/* Total Messages Sent */}
          <Card className="glass-effect border border-gray-200 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Messages Sent</p>
                <p className="text-2xl font-bold">{user?.messagesSent || 0}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-orange-600" />
            </CardContent>
          </Card>

          {/* Active Reels Count */}
          <Card className="glass-effect border border-gray-200 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Reels</p>
                <p className="text-2xl font-bold">{user?.activeReelsCount || 0}</p>
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

          {((user.plan === "free" && (user?.messagesSent || 0) >= 10) ||
            (user.plan === "basic" && (user?.activeReelsCount || 0) >= 30)) && (
              <Card
                onClick={() => navigate("/plans")}
                className="cursor-pointer bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xl hover:scale-105 transition-transform"
              >
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Limit Reached 🚀</p>
                    <p className="text-2xl font-bold">Upgrade Your Plan</p>
                  </div>
                  <Crown className="h-10 w-10 text-yellow-300" />
                </CardContent>
            </Card>
          )}

          <Card className="glass-effect border border-gray-200 shadow-lg" onClick={() => navigate("/dm-automation")}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Go to DM Automation</p>
                
              </div>
              <Crown className="h-8 w-8 text-yellow-600" />
            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  )
}

export default Header
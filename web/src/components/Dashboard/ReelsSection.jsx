import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Video } from "lucide-react";
import ReelCard from "./ReelCard";


function ReelsSection() {
    const reels = useSelector((state) => state?.auth?.user?.reels) || [];

  return (
    <Card className="glass-effect card-shadow">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            Your Reels
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {reels.map((reel) => (
                <ReelCard
                reel={reel} key={reel._id}
                />
            ))}
            </div>
        </CardContent>
    </Card>
  )
}

export default ReelsSection
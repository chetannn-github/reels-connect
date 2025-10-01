import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Hash, Video } from 'lucide-react'
import { Input } from '../ui/Input'
import { useSelector } from 'react-redux'
import { Label } from '../ui/Label';
import { Switch } from '../ui/Switch';
import { useDashboardStore } from '../../pages/Dashboard/useDashboardStore';

function KeywordSection() {
    const reels = useSelector((state) => state.auth.user.reels);
    const {selectedReel, keyword, setKeyword, isActive,setIsActive} = useDashboardStore()
    return (<>
        {selectedReel ? (
            <Card className="glass-effect card-shadow">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-accent" />
                Keyword Setup for {reels.find(r => r._id === selectedReel)?.reelTitle}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                <Label>Trigger Keyword</Label>
                <Input
                    placeholder="e.g. price, buy, discount..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                    Enter a single keyword that will trigger automation when users comment
                </p>
                </div>

                {/* Automation Status Toggle */}
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                    <h3 className="font-medium">Automation Status</h3>
                    <p className="text-sm text-muted-foreground">Enable or disable automation for this reel</p>
                </div>
                <Switch checked={isActive} onCheckedChange={setIsActive} />
                </div>
            </CardContent>
            </Card>
            ) : (
                <Card className="glass-effect card-shadow">
                <CardContent className="text-center py-12">
                    <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Select a Reel to Automate</h3>
                    <p className="text-muted-foreground">Choose a reel from above to set up keyword-based automation</p>
                </CardContent>
                </Card>
    )}</>)
}

export default KeywordSection
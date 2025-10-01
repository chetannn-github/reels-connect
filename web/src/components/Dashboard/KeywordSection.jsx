import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Hash, Video, X } from 'lucide-react'
import { Input } from '../ui/Input'
import { useSelector } from 'react-redux'
import { Label } from '../ui/Label';
import { Switch } from '../ui/Switch';
import { useDashboardStore } from '../../pages/Dashboard/useDashboardStore';
import { Button } from '../ui/Button';
import AutomationSetup from './AutomationSetup';
import CommentSetup from './CommentSetup';
import SaveConfiguration from './SaveConfiguration';

function KeywordSection() {
    const reels = useSelector((state) => state.auth.user.reels);
    const {selectedReel, keyword, setKeyword, isActive,setIsActive, editingId, cancelEdit} = useDashboardStore()
    return (<>
        {selectedReel ? (
            <Card className={`glass-effect card-shadow 'lg:col-span-2'`}>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base justify-between">
                        <span className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-accent" />
                            Keyword Setup for {reels.find(r => r._id === selectedReel)?.reelTitle}
                        </span>
                        {editingId && (
                            <Button variant="ghost" size="sm" onClick={cancelEdit}>
                                <X className="w-4 h-4" />
                            </Button>
                        )}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">

                        <div className="space-y-1.5">
                        <Label className="text-sm">Trigger Keyword</Label>
                        <Input
                            placeholder="e.g. price, buy, discount..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="h-9"
                        />
                        <p className="text-xs text-muted-foreground">
                            Enter a single keyword that will trigger automation when users comment
                        </p>
                        </div>

                        {/* Automation Status Toggle */}
                        <div className="flex items-end">
                            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg w-full">
                                <div>
                                <h3 className="font-medium text-sm">Active</h3>
                                <p className="text-xs text-muted-foreground">Enable automation</p>
                                </div>
                                <Switch checked={isActive} onCheckedChange={setIsActive} />
                            </div>
                        </div>
                    </div>

                    <AutomationSetup/>
                    <CommentSetup/>
                    <SaveConfiguration/>


                </CardContent>
            </Card>
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
</>)
}

export default KeywordSection
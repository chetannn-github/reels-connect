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
    const reels = useSelector((state) => state?.auth?.user.reels);
    const {selectedReel, keyword, setKeyword, editingId, cancelEdit} = useDashboardStore()
    return (<>
            <Card className={`glass-effect card-shadow lg:max-h-[815px] overflow-scroll`}>
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
                    <div className="gap-3">

                        <div className="space-y-1.5">
                            <Label className="text-sm">Trigger Keyword</Label>
                            <Input
                                placeholder="e.g. price, discount..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="h-9"
                            />
                        </div>
                    </div>

                    <AutomationSetup/>
                    <CommentSetup/>
                    <SaveConfiguration/>


                </CardContent>
            </Card>
        
</>)
}

export default KeywordSection
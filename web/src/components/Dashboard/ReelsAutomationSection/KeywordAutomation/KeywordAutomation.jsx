import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/Card'
import { Hash, X } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useDashboardStore } from '../../../../pages/Dashboard/useDashboardStore';
import { Button } from '../../../ui/Button';
import AutomationSetup from './AutomationSetup';
import CommentSetup from './CommentSetup';
import SaveConfiguration from './SaveConfiguration';
import SavedKeywordAutomation from './SavedKeywordAutomation';
import KeywordInput from './KeywordInput';

function KeywordAutomation() {
    const reels = useSelector((state) => state?.auth?.user.reels);
    const {selectedReel,editingId, cancelEdit} = useDashboardStore();

    return (
    <>
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
                <KeywordInput/>
                <AutomationSetup/>
                <CommentSetup/>
                <SaveConfiguration/>
            </CardContent>
        </Card>

        <SavedKeywordAutomation/>
        
    </>)
}

export default KeywordAutomation
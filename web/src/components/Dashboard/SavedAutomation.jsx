import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CreditCard, Edit, Loader2, MessageSquare, Sparkles, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useSelector } from 'react-redux';
import { useDashboardStore } from '../../pages/Dashboard/useDashboardStore';

function SavedAutomation() {
    const token = localStorage.getItem("jwt");
    const reels = useSelector((state) => state.auth.user.reels);
    const {
        selectedReelAutomation,editAutomation,deleteAutomation,
        editingId,selectedReel,isDeletingAutomation,isGettingAutomation} 
        = useDashboardStore();
    return (
        <>
            {(
                <Card className="glass-effect card-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary" />
                                Active Keywords for "{reels.find(r => r._id === selectedReel)?.reelTitle}"
                            </span>
                            <Badge variant="secondary">{selectedReelAutomation.length}</Badge>
                        </CardTitle>
                    </CardHeader>
                    {!isGettingAutomation && <CardContent className="space-y-4">
                        {selectedReelAutomation.map((automation) => (
                            <Card 
                            key={automation._id} 
                            className={`border border-border/50 transition-all cursor-pointer hover:shadow-md ${
                                editingId === automation._id ? 'ring-2 ring-primary/50 bg-primary/5' : ''
                            }`}
                            onClick={() => editAutomation(automation)}
                            >
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <Badge variant={automation.type === 'text' ? 'default' : 'secondary'}>
                                    {automation.type === 'card' ? (
                                        <><CreditCard className="w-3 h-3 mr-1" />Card</>
                                    ) : (
                                        <><MessageSquare className="w-3 h-3 mr-1" />Text</>
                                    )}
                                    </Badge>
                                    <Badge variant={automation.isActive ? 'default' : 'secondary'}>
                                        {automation.isActive ? 'Active' : 'Inactive'}
                                    </Badge>
                                    {automation.commentReplies && (
                                        <Badge variant="outline">
                                            <MessageSquare className="w-3 h-3 mr-1" />
                                            Comments
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        editAutomation(automation);
                                    }}
                                    className="text-primary hover:text-primary"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteAutomation(automation._id,selectedReel, token);
                                    }}
                                    className="text-destructive hover:text-destructive"
                                    >
                                        {isDeletingAutomation === automation._id && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {isDeletingAutomation !== automation._id && <Trash2 className="w-4 h-4" />}
                                    </Button>
                                </div>
                                </div>
                                
                                <div className="mb-3">
                                <p className="text-sm font-medium mb-2">Active Keyword:</p>
                                    <Badge variant="outline" className="font-mono">
                                    {automation.keyword}
                                    </Badge>

                                </div>

                                {automation.type === 'card' && automation.dmCard && (
                                <div className="text-sm text-muted-foreground">
                                    Card: "{automation.dmCard.title}" → {automation.dmCard.button.title}
                                    {automation?.dmCard?.image_url && <img className="w-30 h-20 object-cover rounded-lg border" src={automation.dmCard.image_url}></img>}
                                </div>
                                )}

                                {automation.type === 'text' && automation.dmMessages && (
                                <div className="text-sm text-muted-foreground">
                                    {automation.dmMessages.length} text message(s) configured
                                </div>
                                )}

                                {automation.commentReplies && (
                                <div className="text-sm text-muted-foreground mt-2">
                                    {automation.commentReplies.length} auto-reply message(s) configured
                                </div>
                                )}

                            </CardContent>
                            </Card>
                        ))}
                    </CardContent>}

                    {isGettingAutomation && <div className='h-[200px] w-full flex items-center justify-center'>
                        <Loader2 className="w-10 h-10 mr-2 animate-spin" />
                        getting your automations...
                        </div>}
                </Card>
            )}
        </>
    )
}

export default SavedAutomation
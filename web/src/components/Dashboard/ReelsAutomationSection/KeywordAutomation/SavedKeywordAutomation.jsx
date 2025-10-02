import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/Card';
import { Badge } from '../../../ui/Badge';
import { Ban, CreditCard, Edit, Loader2, MessageSquare, Sparkles, Trash2 } from 'lucide-react';
import { Button } from '../../../ui/Button';
import { useDashboardStore } from '../../../../pages/Dashboard/useDashboardStore';

function SavedKeywordAutomation() {
    const token = localStorage.getItem("jwt");
    const {
        selectedReelAutomation,editAutomation,deleteAutomation,
        editingId,selectedReel,isDeletingAutomation,isGettingAutomation} 
        = useDashboardStore();
    return (
        <Card className="glass-effect card-shadow lg:max-h-[815px] overflow-scroll p-0">
            <CardHeader>
                <CardTitle className="flex items-center justify-between sticky text-sm md:text-xl">
                    <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Active Keywords
                    </span>
                    <Badge variant="secondary">{selectedReelAutomation.length}</Badge>
                </CardTitle>
            </CardHeader>
            <>
                {!isGettingAutomation && (
                    <CardContent className="space-y-4">
                    {selectedReelAutomation.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground h-[500px]">
                        <Ban className="w-20 h-20 mb-4 text-muted-foreground" />
                        <h1 className="text-lg text-foreground font-medium">
                            No automations configured
                        </h1>
                        <p className="text-xs">Start by adding a keyword</p>
                        </div>
                    ) : (
                        selectedReelAutomation.map((automation) => (
                        <Card
                            key={automation._id}
                            className={`border border-border/50 transition-all cursor-pointer hover:shadow-md ${
                            editingId === automation._id
                                ? "ring-2 ring-primary/50 bg-primary/5"
                                : ""
                            }`}
                            onClick={() => editAutomation(automation)}
                        >
                            <CardContent className="p-3 md:p-4">
                            {/* Header badges + actions */}
                                <div className="flex justify-between mb-3 ">
                                    <div className="flex items-center gap-3 ">
                                    <Badge
                                        variant={
                                        automation.type === "text" ? "default" : "secondary"
                                        }
                                    >
                                        {automation.type === "card" ? (
                                        <>
                                            <CreditCard className="w-3 h-3 mr-1 text-xs" /> Card
                                        </>
                                        ) : (
                                        <>
                                            <MessageSquare className="w-3 h-3 mr-1 text-xs" /> Text
                                        </>
                                        )}
                                    </Badge>
                                    <Badge
                                    className ="hidden md:block"
                                        variant={automation.isActive ? "default" : "secondary"}
                                    >
                                        {automation.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                    {automation.commentReplies && (
                                        <Badge variant="outline">
                                        <MessageSquare className="w-3 h-3 mr-1 text-xs" />
                                        Comments
                                        </Badge>
                                    )}
                                    </div>

                                    <div className="flex items-center gap-1 ">
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
                                            deleteAutomation(automation._id, selectedReel, token);
                                            }}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            {isDeletingAutomation === automation._id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                            <Trash2 className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                {/* Active keyword */}
                                <div className="mb-3 flex items-baseline gap-4 ">
                                    <p className="text-sm font-medium mb-2">Active Keyword:</p>
                                    <Badge variant="outline" className="font-mono">
                                    {automation.keyword}
                                    </Badge>
                                </div>

                                {/* Card type automation */}
                                {automation.type === "card" && automation.dmCard && (
                                    <div className="w-64 border rounded-lg shadow-sm overflow-hidden">
                                    {automation.dmCard.image_url && (
                                        <img
                                        src={automation.dmCard.image_url}
                                        alt={automation.dmCard.title || "Card image"}
                                        className="w-full h-45 object-cover aspect-auto"
                                        />
                                    )}
                                    <div className="p-3 space-y-1">
                                        <p className="font-semibold text-sm text-[#f5f5f5] text-left">
                                        {automation.dmCard.title}
                                        </p>
                                        <p className="text-xs text-[#a8a8a8] text-left">
                                        {automation.dmCard.subtitle}
                                        </p>
                                        {automation.dmCard.button?.title && (
                                        <span className="inline-block mt-2 px-3 py-1 text-xs text-[#708dff] font-bold rounded-full">
                                            {automation.dmCard.button.title}
                                        </span>
                                        )}
                                    </div>
                                    </div>
                                )}

                            {/* Text type automation */}
                                {automation.type === "text" && automation.dmMessages && (
                                    <div className="text-sm text-muted-foreground">
                                    {automation.dmMessages.length} text message
                                    {automation.dmMessages.length > 1 ? "s" : ""} configured
                                    </div>
                                )}

                                {/* Comment replies */}
                                {automation.commentReplies && (
                                    <div className="text-sm text-muted-foreground mt-2">
                                    {automation.commentReplies.length} auto-reply message
                                    {automation.commentReplies.length > 1 ? "s" : ""} configured
                                    </div>
                            )}
                            </CardContent>
                        </Card>
                        ))
                    )}
                    </CardContent>
                )}
            </>

            {isGettingAutomation && <div className='h-[200px] w-full flex items-center justify-center'>
                <Loader2 className="w-10 h-10 mr-2 animate-spin" />
            </div>}
        </Card>
    )
}

export default SavedKeywordAutomation
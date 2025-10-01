import { Button } from '../../../components/ui/Button';
import { Card, CardContent} from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Separator } from '../../../components/ui/Separator';
import { Trash2, MessageSquare, CreditCard,Edit, Loader2 } from 'lucide-react';
import useDMAutomationStore from '../hooks/useDMAutomation';

function ExistingAutomationCard({automation}) {
    const { editingId, isDeleting, editAutomation, deleteAutomation } = useDMAutomationStore()
    return (
        <Card key={automation._id} className={`border border-border/50 cursor-pointer hover:shadow-md ${editingId === automation._id ? 'ring-2 ring-primary/50 bg-primary/5' : ''}`} onClick={() => editAutomation(automation)}>
            <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono">{automation.keyword}</Badge>
                    <Badge variant={automation.type === 'text' ? 'default' : 'secondary'}>
                    {automation.type === 'text' ? <><MessageSquare className="w-3 h-3 mr-1" />Text</> : <><CreditCard className="w-3 h-3 mr-1" />Card</>}
                    </Badge>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); editAutomation(automation); }} className="text-primary hover:text-primary"><Edit className="w-4 h-4" /></Button>
                    {isDeleting !== automation._id && <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); deleteAutomation(automation._id); }} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>}
                    {isDeleting === automation._id &&  <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                </div>
                </div>

                {automation.type === 'text' && automation.dmMessages && (
                <div className="space-y-2">
                    {automation.dmMessages.slice(0, 2).map((msg, i) => (
                    <p key={i} className="text-sm bg-muted/50 p-2 rounded truncate">{i + 1}. {msg}</p>
                    ))}
                    {automation.dmMessages.length > 2 && <p className="text-xs text-muted-foreground">+{automation.dmMessages.length - 2} more messages...</p>}
                </div>
                )}

                {automation.type === 'card' && automation.card && (
                    <div className="w-64  border rounded-lg shadow-sm overflow-hidden">
                        {automation.card.image_url && (
                            <img
                            src={automation.card.image_url}
                            alt={automation.card.title || "Card image"}
                            className="w-full h-45 object-cover aspect-auto"
                            />
                        )}
                        <div className="p-3 space-y-1">
                            <p className="font-semibold text-sm text-[#f5f5f5] text-left">{automation.card.title}</p>
                            <p className="text-xs text-[#a8a8a8] text-left">{automation.card.subtitle}</p>
                            {automation.card.button?.title && (
                            <span className="inline-block mt-2 px-3 py-1 text-xs  text-[#708dff] font-bold rounded-full">
                                {automation.card.button.title}
                            </span>
                        )}
                        </div>
                    </div>
                )}

                <Separator className="my-3" />
                <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Created: {new Date(automation.createdAt).toLocaleDateString()}</p>
                <p className="text-xs text-primary">Click to edit</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default ExistingAutomationCard
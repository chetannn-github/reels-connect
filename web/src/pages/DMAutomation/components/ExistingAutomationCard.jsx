import { Button } from '../../../components/ui/Button';

import { Card, CardContent} from '../../../components/ui/Card';

import { Badge } from '../../../components/ui/Badge';
import { Separator } from '../../../components/ui/Separator';
import { Trash2, MessageSquare, CreditCard,Edit, Loader2 } from 'lucide-react';

function ExistingAutomationCard({automation, editingId, isDeleting, editAutomation, deleteAutomation}) {
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
            <div className="space-y-2">
                {automation.card.image_url && (
                <img
                    src={automation.card.image_url}
                    alt={automation.card.title || "Card image"}
                    className="w-1/2 h-20 object-contain rounded-md border"
                />
                )}
                <p className="font-medium text-sm">{automation.card.title}</p>
                <p className="text-sm text-muted-foreground">{automation.card.subtitle}</p>
                <Badge variant="outline" className="text-xs">{automation.card.button.title}</Badge>
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
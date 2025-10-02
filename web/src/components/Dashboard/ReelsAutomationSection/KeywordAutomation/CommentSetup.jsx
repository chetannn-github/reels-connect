import { Plus, Trash2 } from 'lucide-react'
import { Button } from '../../../ui/Button'
import { Input } from '../../../ui/Input'
import { useDashboardStore } from '../../../../pages/Dashboard/useDashboardStore'

function CommentSetup() {
  const { commentReplies,updateCommentReply,
    removeCommentReply,
    addCommentReply} = useDashboardStore();
    
    return (
      <>  
        <div className="flex items-center justify-between p-2 md:p-4 bg-muted/30 rounded-lg">
          <div>
            <h3 className="font-medium">Auto Comment Replies</h3>
          </div>
        </div>

        {(
          <div className="space-y-2 p-3 md:p-4 border rounded-lg">
            {commentReplies.map((reply, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Auto reply ${index + 1}...`}
                  value={reply}
                  onChange={(e) => updateCommentReply(index, e.target.value)}
                  className="h-9 placeholder:text-xs md:placeholder:text-sm  text-xs md:text-sm"
                />

                <Button
                    variant="outline"
                    size="icon"
                    onClick={addCommentReply}
                    className="shrink-0"
                  >
                    <Plus className="sm:w-3 sm:h-3 md:w-4 md:h-4" />
                  </Button>
                  {commentReplies.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeCommentReply(index)}
                      className="shrink-0"
                    >
                      <Trash2 className="sm:w-3 sm:h-3 md:w-4 md:h-4" />
                    </Button>
                  )}
                
              </div>
            ))}
          </div>
        )}
      </>
    )

}

export default CommentSetup
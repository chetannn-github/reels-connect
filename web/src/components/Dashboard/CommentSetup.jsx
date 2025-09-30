import { MessageCircle, Plus, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Switch } from '../ui/Switch'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

function CommentSetup({
    selectedReel,commentsActive,setCommentsActive,
    commentReplies,updateCommentReply,removeCommentReply,
    addCommentReply
}) {
    return (
        <>
        {selectedReel && (
            <Card className="glass-effect card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-accent" />
                  Auto Comment Replies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">
                    💬 <strong>Random Reply:</strong> When users comment on your reel, a random reply will be automatically selected from the list below and posted.
                  </p>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <h3 className="font-medium">Auto Comment Replies</h3>
                    <p className="text-sm text-muted-foreground">Automatically reply to comments with predefined messages</p>
                  </div>
                  <Switch checked={commentsActive} onCheckedChange={setCommentsActive} />
                </div>

                {commentsActive && (
                  <div className="space-y-4 p-4 border rounded-lg">
                    {commentReplies.map((reply, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder={`Auto reply ${index + 1}...`}
                          value={reply}
                          onChange={(e) => updateCommentReply(index, e.target.value)}
                        />
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={addCommentReply}
                            className="shrink-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          {commentReplies.length > 1 && (
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => removeCommentReply(index)}
                              className="shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </>
    )

}

export default CommentSetup
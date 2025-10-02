import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Label } from '../../../components/ui/Label';
import { Button } from '../../../components/ui/Button';
import { Textarea } from '../../../components/ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/Select';
import { Badge } from '../../../components/ui/Badge';
import { Sparkles, Trash2, Plus, Bot, Loader2 } from 'lucide-react';
import api from '../../../lib/api';

const aiAutomationApi = {
    token : localStorage.getItem("jwt"),
    create: async (ruleData) => {
        console.log('Creating AI rule:', ruleData);
        return await api.post('/instruction',ruleData,localStorage.getItem("jwt"));
    },
    get: async (reelId) => {
        console.log('Getting AI rules for reel:', reelId);
        return await api.get(`/instruction/${reelId}`,localStorage.getItem("jwt"));
        
    },
    delete: async (ruleId) => {
        console.log('Deleting AI rule:', ruleId);
        return await api.del(`/instruction`,{instructionId :ruleId}, localStorage.getItem("jwt"));
    },
};

const AIAutomation = ({ reelId }) => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCreating,setIsCreating] = useState(false);
  const [isDeleting,setIsDeleting] = useState(null)

  const [instruction, setInstruction] = useState('');
  const [action, setAction] = useState('comment');
  const [commentMessage, setCommentMessage] = useState('');
  const [dmMessage, setDmMessage] = useState('');

  useEffect(() => {
    loadRules();
  }, [reelId]);

  const loadRules = async () => {
    try {
      setLoading(true);
      const { data }= await aiAutomationApi.get(reelId);
      setRules(data|| []);
    } catch (error) {
      console.error('Error loading AI rules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRule = async () => {
    if (!instruction.trim()) {
      return;
    }

    if (action.includes('comment') && !commentMessage.trim()) {
      return;
    }

    if (action.includes('dm') && !dmMessage.trim()) {
      return;
    }

    try {
        
      setLoading(true);
      setIsCreating(true)
      const ruleData = {
        reelId,
        instruction: instruction.trim(),
        action,
      };
      if (action.includes('comment')) ruleData.commentMessage = commentMessage.trim();
      if (action.includes('dm')) ruleData.dmMessage = dmMessage.trim();

      await aiAutomationApi.create(ruleData);

      setInstruction('');
      setAction('comment');
      setCommentMessage('');
      setDmMessage('');

      await loadRules();
    } catch (error) {
      console.error('Error creating AI rule:', error);
    } finally {
      setLoading(false);
      setIsCreating(false)
    }
  };

  const handleDeleteRule = async (ruleId) => {
    try {
      setLoading(true);
      setIsDeleting(ruleId)
      await aiAutomationApi.delete(ruleId);
      await loadRules();
    } catch (error) {
      console.error('Error deleting AI rule:', error);
    } finally {
      setLoading(false);
      setIsDeleting(null)
    }
  };

  const getActionBadgeVariant = (action) => {
    switch (action) {
      case 'comment':
        return 'default';
      case 'comment+dm':
        return 'secondary';
      case 'ignore':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <Card className="glass-effect card-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Bot className="w-4 h-4 text-primary" />
          AI Automation
          <Badge variant="secondary" className="ml-2 text-xs">Pro</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid lg:grid-cols-2 gap-3">
        <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
          <h3 className="font-medium text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create New Rule
          </h3>

          <div className="space-y-1.5">
            <Label className="text-sm">Action</Label>
            <Select value={action} onValueChange={(value) => setAction(value)} className="bg-black">
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent className="bg-black">
                <SelectItem value="comment">Comment</SelectItem>
                <SelectItem value="comment+dm">Comment + DM</SelectItem>
                <SelectItem value="ignore">Ignore</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">Instruction</Label>
            <Textarea
              placeholder="Describe when and how the AI should respond..."
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              className="min-h-[80px] resize-none text-sm"
            />
          </div>

          {action.includes('comment') && (
            <div className="space-y-1.5">
              <Label className="text-sm">Comment Message</Label>
              <Textarea
                placeholder="The comment AI will post..."
                value={commentMessage}
                onChange={(e) => setCommentMessage(e.target.value)}
                className="min-h-[60px] resize-none text-sm"
              />
            </div>
          )}

          {action.includes('dm') && (
            <div className="space-y-1.5">
              <Label className="text-sm">DM Message</Label>
              <Textarea
                placeholder="The DM AI will send..."
                value={dmMessage}
                onChange={(e) => setDmMessage(e.target.value)}
                className="min-h-[60px] resize-none text-sm"
              />
            </div>
          )}

          {!isCreating && <Button
            onClick={handleCreateRule}
            disabled={loading}
            className="w-full h-9"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Rule
          </Button>}

          {isCreating && <Button
            className="w-full h-9"
            size="sm"
          >
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Create Rule ....
          </Button>}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Active Rules ({rules.length})
          </h3>

          {loading && rules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
                <Loader2  className="w-8 h-8 text-muted-foreground mx-auto mb-2 animate-spin" />
            </div>
          ) : rules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No AI automation rules yet. Create one above!
            </div>
          ) : (
            <div className="space-y-2">
              {rules.map((rule) => (
                <Card key={rule._id} className="border bg-background/50">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 space-y-2">
                        <Badge variant={getActionBadgeVariant(rule.action)} className="text-xs">
                          {rule.action}
                        </Badge>
                        <p className="text-sm text-foreground font-medium">
                          {rule.instruction}
                        </p>
                        {rule.commentMessage && (
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">Comment:</span> {rule.commentMessage}
                          </div>
                        )}
                        {rule.dmMessage && (
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">DM:</span> {rule.dmMessage}
                          </div>
                        )}
                      </div>
                      {isDeleting !== rule._id && <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive shrink-0"
                        onClick={() => handleDeleteRule(rule._id)}
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>}

                      {isDeleting === rule._id && <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive shrink-0"
                      >
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </Button>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAutomation;

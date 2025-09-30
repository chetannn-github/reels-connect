import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Label } from '../components/ui/Label';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Textarea';
import { Input } from '../components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Switch } from '../components/ui/Switch';
import { Badge } from '../components/ui/Badge';
import { Upload, Video, MessageCircle, Sparkles, Plus, Trash2, Edit, Settings, Hash, CreditCard, MessageSquare, X, Save, Play } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useDispatch } from 'react-redux';

const DashboardV2 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [selectedReel, setSelectedReel] = useState('');
    const [keyword, setKeyword] = useState('');
    const [type, setType] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const [title, setTitle] = useState('');
    const [subtitle, setSubTitle] = useState('');
    const [card, setCardImage] = useState(null);
    const [buttonTitle, setButtonTitle] = useState('');
    const [buttonUrl, setButtonUrl] = useState('');

    const [textMessages, setTextMessages] = useState(['']);
    const [commentReplies, setCommentReplies] = useState(['']);
    const [commentsActive, setCommentsActive] = useState(false);

    const [savedAutomations, setSavedAutomations] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [reels,setReels] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("jwt");
    const [selectedReelAutomation, setSelectedReelAutomation] = useState([]);

  const addTextMessage = () => setTextMessages([...textMessages, '']);
  const removeTextMessage = (index) => textMessages.length > 1 && setTextMessages(textMessages.filter((_, i) => i !== index));
  const updateTextMessage = (index, value) => {
    const updated = [...textMessages];
    updated[index] = value;
    setTextMessages(updated);
  };

  const addCommentReply = () => setCommentReplies([...commentReplies, '']);
  const removeCommentReply = (index) => commentReplies.length > 1 && setCommentReplies(commentReplies.filter((_, i) => i !== index));
  const updateCommentReply = (index, value) => {
    const updated = [...commentReplies];
    updated[index] = value;
    setCommentReplies(updated);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setCardImage(file);
  };

  const saveReelAutomation = async() => {
    if (!selectedReel) {
      return;
    }
    if (!keyword.trim()) {
      return;
    }
    if (!type) {
      return;
    }
    const payload = {
        reelId : selectedReel,
        keyword: keyword.trim(),
        commentReplies : commentsActive ? commentReplies.filter(r => r.trim()) : null,
        dmMessages : type === 'text' ? textMessages.filter(m => m.trim()) : null,
        dmCard : type === 'card' ? {title :title, subtitle : subtitle, button : {title : buttonTitle, url : buttonUrl,}, image_url : card } : null,
        type : type,
        isActive
    }
    const res = await api.post("/comment-automation",payload, token);
    resetReelForm();
  };

  const resetReelForm = () => {
    setKeyword('');
    setType(null);
    setIsActive(false);
    setTitle('');
    setSubTitle('');
    setButtonTitle('');
    setButtonUrl('');
    setCardImage(null);
    setTextMessages(['']);
    setCommentReplies(['']);
    setCommentsActive(false);
    setEditingId(null);
  };

  const editAutomation = (automation) => {
    setSelectedReel(automation.selectedReel);
    setKeyword(automation.keyword || '');
    setType(automation.type);
    setIsActive(automation.isActive || false);
    setEditingId(automation._id);

    if (automation.type === 'card' && automation.dmCard) {
      setTitle(automation.dmCard.title);
      setSubTitle(automation.dmCard.subtitle);
      setButtonTitle(automation.dmCard.buttonTitle);
      setButtonUrl(automation.dmCard.buttonUrl);
      setCardImage(automation.dmCard.card);
    } else if (automation.type === 'text' && automation.textAutomation) {
      setTextMessages(automation.textAutomation.messages);
    }

    if (automation.commentReplies) {
      setCommentReplies(automation.commentReplies);
      setCommentsActive(true);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteAutomation = async(_id) => {
    await api.del("/comment-automation", {reelId : _id} , token)
  };

  const cancelEdit = () => resetReelForm();

  

  const handleReelSelection = async (reelId) => {
    try {
        setSelectedReel(reelId)
        const res = await api.get(`/comment-automation/${reelId}`, token);
        console.log("automations")
        console.log(res.automations);
        selectedReelAutomation(res.automations);
    } catch (error) {
        
    }
  }

  useEffect(() => {
      const fetchUserAndAnalytics = async () => {
        try {
          const token = localStorage.getItem("jwt");
          if (!token) return navigate("/");
            setLoading(false);
          const userData = await api.get("/auth/me", token);
        //   dispatch(setAuth({ user: userData, token }));
            setReels(userData?.reels);
        //   setSelectedReel(userData?.reels[0]?.reelId);
  
        //   const analyticsRes = await api.get("/analytics", token);
        //   setAnalytics(analyticsRes)
        } catch (err) {
          console.error("Failed to fetch user info:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserAndAnalytics();
    }, [dispatch, navigate]);

   if (loading) return <FullScreenLoader variant="orbit" message="Welcome to Dashboard" isVisible={loading}/>

  return (
  <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-effect border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Reel Automation Dashboard</h1>
              <p className="text-muted-foreground text-sm">Set up keyword-based automation for your Instagram reels</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Reels Grid */}
        <Card className="glass-effect card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              Your Reels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {reels.map((reel) => (
                <Card 
                  key={reel._id} 
                  className={`group cursor-pointer transition-all duration-300 hover-scale hover:shadow-xl border-0 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm overflow-hidden flex-shrink-0 w-72 ${
                    selectedReel === reel._id 
                      ? 'ring-2 ring-primary shadow-2xl shadow-primary/20 bg-gradient-to-br from-primary/5 to-primary/10' 
                      : 'hover:ring-1 hover:ring-primary/50'
                  }`}
                  onClick={() => handleReelSelection(reel._id)}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img 
                        src={reel.thumbnailURL} 
                        alt={reel.reelTitle}
                        className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                          <Play className="w-6 h-6 text-white ml-1" fill="white" />
                        </div>
                      </div>
                      
                      {/* View Count */}
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                        <Play className="w-3 h-3 inline mr-1" fill="white" />
                        {reel.views}
                      </div>
                      
                      {/* Selection Indicator */}
                      {selectedReel === reel._id && (
                        <div className="absolute top-3 left-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-scale-in">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                        {reel.reelTitle}
                      </h3>
                      
                      {savedAutomations.find(auto => auto.selectedReel === reel._id) && (
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant={savedAutomations.find(auto => auto.selectedReel === reel._id)?.isActive ? 'default' : 'secondary'}
                            className="text-xs animate-fade-in"
                          >
                            {savedAutomations.find(auto => auto.selectedReel === reel._id)?.isActive ? (
                              <>
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                                Active
                              </>
                            ) : (
                              <>
                                <div className="w-2 h-2 bg-gray-400 rounded-full mr-2" />
                                Inactive
                              </>
                            )}
                          </Badge>
                          <Switch
                            checked={savedAutomations.find(auto => auto.selectedReel === reel._id)?.isActive || false}
                            onCheckedChange={(checked) => {
                              const automation = savedAutomations.find(auto => auto.selectedReel === reel._id);
                              if (automation) {
                                setSavedAutomations(prev => 
                                  prev.map(auto => 
                                    auto._id === automation._id ? { ...auto, isActive: checked } : auto
                                  )
                                );
                              }
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="transition-all duration-200"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Keywords Setup or Empty State */}
        {selectedReel ? (
          <Card className="glass-effect card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-accent" />
                Keyword Setup for {reels.find(r => r._id === selectedReel)?.reelTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Trigger Keyword</Label>
                <Input
                  placeholder="e.g. price, buy, discount..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Enter a single keyword that will trigger automation when users comment
                </p>
              </div>

              {/* Automation Status Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <h3 className="font-medium">Automation Status</h3>
                  <p className="text-sm text-muted-foreground">Enable or disable automation for this reel</p>
                </div>
                <Switch checked={isActive} onCheckedChange={setIsActive} />
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="glass-effect card-shadow">
            <CardContent className="text-center py-12">
              <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Select a Reel to Automate</h3>
              <p className="text-muted-foreground">Choose a reel from above to set up keyword-based automation</p>
            </CardContent>
          </Card>
        )}

        {/* Automation Setup */}
        {selectedReel && (
          <Card className="glass-effect card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  {editingId ? 'Edit Automation Setup' : 'Automation Setup'}
                </span>
                {editingId && (
                  <Button variant="ghost" size="sm" onClick={cancelEdit}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={type || 'card'} onValueChange={(value) => setType(value)} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="card">Card Automation</TabsTrigger>
                  <TabsTrigger value="text">Text Automation</TabsTrigger>
                </TabsList>

                <TabsContent value="card" className="space-y-4 mt-6">
                  <div className="grid md:grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Card Title</Label>
                        <Input
                          placeholder="Amazing Deal!"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Card Subtitle</Label>
                        <Input
                          placeholder="Get 50% off on all products"
                          value={subtitle}
                          onChange={(e) => setSubTitle(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Button Title</Label>
                        <Input
                          placeholder="Shop Now"
                          value={buttonTitle}
                          onChange={(e) => setButtonTitle(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Button URL</Label>
                        <Input
                          placeholder="https://your-store.com"
                          value={buttonUrl}
                          onChange={(e) => setButtonUrl(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Upload Image</Label>
                        {card ? (
                          <div className="space-y-3">
                            <div className="relative">
                              <img 
                                src={URL.createObjectURL(card)} 
                                alt="Card preview" 
                                className="w-full h-48 object-cover rounded-lg border"
                              />
                              <Button
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => setCardImage(null)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground text-center">{card.name}</p>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              _id="card-image"
                            />
                            <label htmlFor="card-image" className="cursor-pointer">
                              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground">
                                Click to upload image
                              </p>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="text" className="space-y-4 mt-6">
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      💡 <strong>Random Selection:</strong> When users trigger this automation, a random message will be selected from the list below and sent automatically.
                    </p>
                  </div>
                  <div className="space-y-4 p-4 border rounded-lg">
                    {textMessages.map((message, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-medium">Message {index + 1}</Label>
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={addTextMessage}
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            {textMessages.length > 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeTextMessage(index)}
                                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <Textarea
                          placeholder={`Enter your automated message ${index + 1}...`}
                          value={message}
                          onChange={(e) => updateTextMessage(index, e.target.value)}
                          className="min-h-[60px] resize-none"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Comment Replies - Always Available */}
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

        {/* Saved Automations for Selected Reel */}
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
            <CardContent className="space-y-4">
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
                            deleteAutomation(automation._id);
                          }}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-2">Active Keyword:</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="font-mono">
                          {automation.keyword}
                        </Badge>
                      </div>
                    </div>

                    {automation.type === 'card' && automation.dmCard && (
                      <div className="text-sm text-muted-foreground">
                        Card: "{automation.dmCard.title}" → {automation.dmCard.button.title}
                      </div>
                    )}

                    {automation.type === 'text' && automation.textAutomation && (
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
            </CardContent>
          </Card>
        )}

        {/* Save Configuration */}
        {selectedReel && (
          <Card className="glass-effect card-shadow">
            <CardHeader>
              <CardTitle>Save Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={saveReelAutomation}
                className="w-full gradient-primary text-primary-foreground"
                size="lg"
                disabled={!selectedReel || !keyword || !type}
              >
                {editingId ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Automation
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Save Reel Automation
                  </>
                )}
              </Button>
              
              {(!selectedReel || !keyword || !type) && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Please select a reel, add a keyword, and choose automation type to save
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
 </div>

  );
};

export default DashboardV2;

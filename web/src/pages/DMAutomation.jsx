import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Label } from '../components/ui/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';
import { Separator } from '../components/ui/Separator';
import { Plus, Trash2, Upload, MessageSquare, CreditCard, Edit3, Edit, Save, X, Loader2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';
import { isValidUrl } from '../lib/utils';
import { FullScreenLoader } from '../components/ui/FullScreenLoader';


const DMAutomation = () => {
  const token = localStorage.getItem("jwt");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isFetchingAutomation, setIsFetchingAutomation] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');
  const [automationType, setAutomationType] = useState('text');
  const [dmMessages, setDmMessages] = useState(['']);
  const [card, setCard] = useState({
    title: '',
    subtitle: '',
    image_url: '',
    button: { title: '', url: '' }
  });
  const [editingId, setEditingId] = useState(null);
  const [existingAutomations, setExistingAutomations] = useState([]);

  const addTextMessage = () => setDmMessages([...dmMessages, '']);
  const removeTextMessage = (index) => setDmMessages(dmMessages.filter((_, i) => i !== index));
  const updateTextMessage = (index, value) =>
    setDmMessages(dmMessages.map((msg, i) => (i === index ? value : msg)));

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCard({ ...card, image_url: e.target.result });
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setKeyword('');
    setDmMessages(['']);
    setCard({ title: '', subtitle: '', image_url: '', button: { title: '', url: '' } });
    setEditingId(null);
  };

  const isButtonDisabled = () => {
    if(!keyword.trim()) return true;
    
    if (automationType === 'text') {
      return !dmMessages.some(msg => msg.trim() !== '');
    } else if (automationType === 'card') {
      if (!card.title.trim() || !card.subtitle.trim()) return true;
      const btnTitle = card.button.title.trim();
      const btnUrl = card.button.url.trim();

      if(btnUrl && !isValidUrl(btnUrl)) return true;
      if ((btnTitle && !btnUrl) || (!btnTitle && btnUrl)) return true;
        return false;
      }
    return true;
  };

  const saveAutomation = async () => {
    try {
      setIsSaving(true);
      let payload = {
        keyword: keyword.trim().toLowerCase(),
        dmMessages: [],
        card: null,
        isActive: true,
        type: automationType
      };

      if (automationType === 'text') {
        const validMessages = dmMessages.map(msg => msg.trim()).filter(msg => msg);
        payload.dmMessages = validMessages;
      } else {
        payload.card = {
          title: card.title.trim(),
          subtitle: card.subtitle.trim(),
          image_url: card.image_url || '',
          button: {
            title: card.button.title.trim(),
            url: card.button.url.trim()
          }
        };
      }
      let res;
      if(editingId ===null ) res = await api.post('/dm-automation', payload, token);
      else {
        payload.dmAutomationId = editingId;
        res = await api.put('/dm-automation', payload, token);
      }
      setIsSaving(false);
      resetForm();
      await fetchAutomations();
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const editAutomation = (automation) => {
    setKeyword(automation.keyword);
    setAutomationType(automation.type);
    setEditingId(automation._id);

    if (automation.type === 'text') setDmMessages(automation.dmMessages || ['']);
    else if (automation.type === 'card') setCard(automation.card || {
      title: '', subtitle: '', image_url: '', button: { title: '', url: '' }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => resetForm();

  const deleteAutomation = async (id) => {
    try {
      setIsDeleting(id)
      await api.del("/dm-automation",{ dmAutomationId : id },token);
      setExistingAutomations(existingAutomations.filter(auto => auto._id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(null);
    }
    
    if (editingId === id) resetForm();
  };

  const fetchAutomations = async () => {
    try {
      console.log("fetchingg")
      const token = localStorage.getItem("jwt");
      if (!token) return navigate("/");
      const res = await api.get("/dm-automation", token);
      setExistingAutomations((prev) => [...res.rules]);
      setIsFetchingAutomation(false);
    } catch (err) {
      console.error("Error fetching automations:", err);
    } 
  };

  useEffect(() => {fetchAutomations(); }, []);
  if(isFetchingAutomation) return <FullScreenLoader variant="orbit" message="Welcome to DM Automation" isVisible={isFetchingAutomation}/>

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            DM Automation Pro
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create intelligent keyword-based automated responses for your DMs. Set up text messages or rich card responses.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Create/Edit Automation */}
          <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-primary" />
                  {editingId ? 'Edit Automation' : 'Create New Automation'}
                </span>
                {editingId && <Button variant="ghost" size="sm" onClick={cancelEdit}><X className="w-4 h-4" /></Button>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Keyword Input */}
              <div className="space-y-2">
                <Label htmlFor="keyword">Trigger Keyword</Label>
                <Input
                  id="keyword"
                  placeholder="e.g., hello, pricing, support"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="font-medium"
                />
              </div>

              {/* Automation Type */}
              <Tabs value={automationType} onValueChange={(value) => setAutomationType(value)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Text Messages
                  </TabsTrigger>
                  <TabsTrigger value="card" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> Card Message
                  </TabsTrigger>
                </TabsList>

                {/* Text Messages Tab */}
                <TabsContent value="text" className="space-y-4">
                  <div className="space-y-3">
                    {dmMessages.map((msg, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="flex-1 space-y-2">
                          <Label>Message {index + 1}</Label>
                          <Textarea
                            placeholder="Enter your automated response..."
                            value={msg}
                            onChange={(e) => updateTextMessage(index, e.target.value)}
                            className="min-h-[80px]"
                          />
                        </div>
                        {dmMessages.length > 1 && (
                          <Button variant="outline" size="icon" onClick={() => removeTextMessage(index)} className="mt-7 text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" onClick={addTextMessage} className="w-full flex items-center gap-2">
                      <Plus className="w-4 h-4" /> Add Another Message
                    </Button>
                  </div>
                </TabsContent>

                {/* Card Message Tab */}
                <TabsContent value="card" className="space-y-6">
                  <div className="space-y-2">
                    <Label>Card Title</Label>
                    <Input value={card.title} onChange={(e) => setCard({ ...card, title: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Card Subtitle</Label>
                    <Textarea value={card.subtitle} onChange={(e) => setCard({ ...card, subtitle: e.target.value })} className="min-h-[60px]" />
                  </div>
                  <div className="space-y-2">
                    <Label>Card Image (Optional)</Label>
                    <div className="flex items-center gap-4">
                      <Button variant="outline" onClick={() => document.getElementById('cardImage')?.click()} className="flex items-center gap-2">
                        <Upload className="w-4 h-4" /> Upload Image
                      </Button>
                      <input id="cardImage" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      {card.image_url && <img src={card.image_url} alt="Preview" className="w-16 h-16 object-cover rounded-lg border" />}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Button title" value={card.button.title} onChange={(e) => setCard({ ...card, button: { ...card.button, title: e.target.value } })} />
                    <Input placeholder="Button URL" value={card.button.url} onChange={(e) => setCard({ ...card, button: { ...card.button, url: e.target.value } })} />
                  </div>
                </TabsContent>
              </Tabs>

              <Button onClick={saveAutomation} className="w-full" disabled= {isButtonDisabled()}>
                {editingId ? 
                  ( !isSaving ? <><Save className="w-4 h-4 mr-2" /> Update Automation</> :
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating Automation...</>) 
                  :(!isSaving ? 'Create Automation' : <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating Automation...</>)}
                
              </Button>
            </CardContent>
          </Card>

          {/* Existing Automations */}
          <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Active Automations</span>
                <Badge variant="secondary">{existingAutomations.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {existingAutomations.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No automations created yet.</p>
                  </div>
                ) : existingAutomations.map((automation) => (
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
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DMAutomation;


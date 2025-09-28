import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Plus, Trash2, Upload, MessageSquare, CreditCard, Edit3, Edit, Save, X } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const DMAutomation = () => {
  const { toast } = useToast();
  const [keyword, setKeyword] = useState('');
  const [automationType, setAutomationType] = useState('text');
  const [textMessages, setTextMessages] = useState([{ id: '1', content: '' }]);
  const [cardMessage, setCardMessage] = useState({
    title: '',
    subtitle: '',
    image: null,
    imagePreview: '',
    button: { title: '', url: '' }
  });
  const [editingId, setEditingId] = useState(null);
  const [existingAutomations, setExistingAutomations] = useState([
    {
      id: '1',
      keyword: 'hello',
      type: 'text',
      textMessages: [
        { id: '1', content: 'Hi there! Thanks for reaching out!' },
        { id: '2', content: 'How can I help you today?' }
      ],
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      keyword: 'pricing',
      type: 'card',
      cardMessage: {
        title: 'Our Pricing Plans',
        subtitle: 'Choose the perfect plan for your needs',
        button: { title: 'View Plans', url: 'https://example.com/pricing' }
      },
      createdAt: new Date('2024-01-10')
    }
  ]);

  const addTextMessage = () => {
    setTextMessages([...textMessages, { id: Date.now().toString(), content: '' }]);
  };

  const removeTextMessage = (id) => {
    setTextMessages(textMessages.filter(msg => msg.id !== id));
  };

  const updateTextMessage = (id, content) => {
    setTextMessages(textMessages.map(msg => msg.id === id ? { ...msg, content } : msg));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCardMessage({
          ...cardMessage,
          image: file,
          imagePreview: e.target?.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setKeyword('');
    setTextMessages([{ id: '1', content: '' }]);
    setCardMessage({
      title: '',
      subtitle: '',
      image: null,
      imagePreview: '',
      button: { title: '', url: '' }
    });
    setEditingId(null);
  };

  const saveAutomation = () => {
    if (!keyword.trim()) {
      toast({
        title: "Error",
        description: "Please enter a keyword",
        variant: "destructive"
      });
      return;
    }

    const automationData = {
      keyword: keyword.trim().toLowerCase(),
      type: automationType,
      createdAt: editingId ? existingAutomations.find(a => a.id === editingId)?.createdAt || new Date() : new Date()
    };

    if (automationType === 'text') {
      const validMessages = textMessages.filter(msg => msg.content.trim());
      if (validMessages.length === 0) {
        toast({
          title: "Error",
          description: "Please add at least one text message",
          variant: "destructive"
        });
        return;
      }
      automationData.textMessages = validMessages;
    } else {
      if (!cardMessage.title.trim() || !cardMessage.subtitle.trim()) {
        toast({
          title: "Error",
          description: "Please fill in card title and subtitle",
          variant: "destructive"
        });
        return;
      }
      if (!cardMessage.button.title.trim() || !cardMessage.button.url.trim()) {
        toast({
          title: "Error",
          description: "Please fill in button title and URL",
          variant: "destructive"
        });
        return;
      }
      automationData.cardMessage = cardMessage;
    }

    if (editingId) {
      setExistingAutomations(prev => 
        prev.map(auto => auto.id === editingId ? { ...auto, ...automationData } : auto)
      );
      toast({
        title: "Success",
        description: "Automation updated successfully!",
        variant: "default"
      });
    } else {
      const newAutomation = {
        id: Date.now().toString(),
        ...automationData
      };
      
      setExistingAutomations([newAutomation, ...existingAutomations]);
      toast({
        title: "Success",
        description: "Automation created successfully!",
        variant: "default"
      });
    }

    resetForm();
  };

  const editAutomation = (automation) => {
    setKeyword(automation.keyword);
    setAutomationType(automation.type);
    setEditingId(automation.id);

    if (automation.type === 'text' && automation.textMessages) {
      setTextMessages(automation.textMessages);
    } else if (automation.type === 'card' && automation.cardMessage) {
      setCardMessage(automation.cardMessage);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    resetForm();
  };

  const deleteAutomation = (id) => {
    setExistingAutomations(existingAutomations.filter(auto => auto.id !== id));
    if (editingId === id) {
      resetForm();
    }
    toast({
      title: "Deleted",
      description: "Automation deleted successfully",
      variant: "default"
    });
  };

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
              {editingId && (
                <Button variant="ghost" size="sm" onClick={cancelEdit}>
                  <X className="w-4 h-4" />
                </Button>
              )}
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

            {/* Automation Type Selection */}
            <Tabs value={automationType} onValueChange={(value) => setAutomationType(value)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Text Messages
                </TabsTrigger>
                <TabsTrigger value="card" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Card Message
                </TabsTrigger>
              </TabsList>

              {/* Text Messages Tab */}
              <TabsContent value="text" className="space-y-4">
                <div className="space-y-3">
                  {textMessages.map((message, index) => (
                    <div key={message.id} className="flex gap-2">
                      <div className="flex-1 space-y-2">
                        <Label>Message {index + 1}</Label>
                        <Textarea
                          placeholder="Enter your automated response..."
                          value={message.content}
                          onChange={(e) => updateTextMessage(message.id, e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>
                      {textMessages.length > 1 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeTextMessage(message.id)}
                          className="mt-7 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addTextMessage}
                    className="w-full flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Another Message
                  </Button>
                </div>
              </TabsContent>

              {/* Card Message Tab */}
              <TabsContent value="card" className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardTitle">Card Title</Label>
                    <Input
                      id="cardTitle"
                      placeholder="e.g., Our Services"
                      value={cardMessage.title}
                      onChange={(e) => setCardMessage({ ...cardMessage, title: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardSubtitle">Card Subtitle</Label>
                    <Textarea
                      id="cardSubtitle"
                      placeholder="Brief description of your card content..."
                      value={cardMessage.subtitle}
                      onChange={(e) => setCardMessage({ ...cardMessage, subtitle: e.target.value })}
                      className="min-h-[60px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardImage">Card Image (Optional)</Label>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById('cardImage')?.click()}
                        className="flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Upload Image
                      </Button>
                      <input
                        id="cardImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      {cardMessage.imagePreview && (
                        <img
                          src={cardMessage.imagePreview}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Action Button</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Button title"
                        value={cardMessage.button.title}
                        onChange={(e) => setCardMessage({
                          ...cardMessage,
                          button: { ...cardMessage.button, title: e.target.value }
                        })}
                      />
                      <Input
                        placeholder="Button URL"
                        value={cardMessage.button.url}
                        onChange={(e) => setCardMessage({
                          ...cardMessage,
                          button: { ...cardMessage.button, url: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button onClick={saveAutomation} className="w-full">
              {editingId ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update Automation
                </>
              ) : (
                'Create Automation'
              )}
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
                  <p className="text-sm">Create your first automation to get started!</p>
                </div>
              ) : (
                existingAutomations.map((automation) => (
                  <Card 
                    key={automation.id} 
                    className={`border border-border/50 transition-all cursor-pointer hover:shadow-md ${
                      editingId === automation.id ? 'ring-2 ring-primary/50 bg-primary/5' : ''
                    }`}
                    onClick={() => editAutomation(automation)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="font-mono">
                            {automation.keyword}
                          </Badge>
                          <Badge variant={automation.type === 'text' ? 'default' : 'secondary'}>
                            {automation.type === 'text' ? (
                              <><MessageSquare className="w-3 h-3 mr-1" />Text</>
                            ) : (
                              <><CreditCard className="w-3 h-3 mr-1" />Card</>
                            )}
                          </Badge>
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
                              deleteAutomation(automation.id);
                            }}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {automation.type === 'text' && automation.textMessages && (
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            {automation.textMessages.length} message(s):
                          </p>
                          {automation.textMessages.slice(0, 2).map((msg, index) => (
                            <p key={msg.id} className="text-sm bg-muted/50 p-2 rounded truncate">
                              {index + 1}. {msg.content}
                            </p>
                          ))}
                          {automation.textMessages.length > 2 && (
                            <p className="text-xs text-muted-foreground">
                              +{automation.textMessages.length - 2} more messages...
                            </p>
                          )}
                        </div>
                      )}

                      {automation.type === 'card' && automation.cardMessage && (
                        <div className="space-y-2">
                          <p className="font-medium text-sm">{automation.cardMessage.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {automation.cardMessage.subtitle}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {automation.cardMessage.button.title}
                          </Badge>
                        </div>
                      )}

                      <Separator className="my-3" />
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          Created: {automation.createdAt.toLocaleDateString()}
                        </p>
                        <p className="text-xs text-primary">
                          Click to edit
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

};

export default DMAutomation;

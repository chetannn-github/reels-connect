import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Label } from '../../../components/ui/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/Tabs';
import { Plus, Trash2, Upload, MessageSquare, CreditCard, Edit3, Save, X, Loader2 } from 'lucide-react';
import useDMAutomationStore from '../hooks/useDMAutomation';



function CreateAutomation() {
  const {saveAutomation,cancelEdit,isButtonDisabled,
    addTextMessage,removeTextMessage, updateTextMessage,handleImageUpload, 
    isSaving,setKeyword,keyword,automationType, setAutomationType,
    dmMessages,card,setCard, editingId, isUploadingImage} = useDMAutomationStore();
  return (
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
                          <Input
                            placeholder="Enter your automated response..."
                            value={msg}
                            onChange={(e) => updateTextMessage(index, e.target.value)}
                            className="min-h-[40px]"
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
                    <Input value={card.subtitle} onChange={(e) => setCard({ ...card, subtitle: e.target.value })} className="min-h-[20px]" />
                  </div>
                  <div className="space-y-2">
                    <Label>Card Image (Optional)</Label>
                    <div className="flex items-center gap-4">
                      <Button variant="outline" onClick={() => document.getElementById('cardImage')?.click()} className="flex items-center gap-2">
                          <Upload className="w-4 h-4" /> Upload Image
                        </Button>
                      {!isUploadingImage && <>
                        <input id="cardImage" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        {card.image_url && <img src={card.image_url} alt="Preview" className="w-16 h-16 object-cover rounded-lg border" />}
                        </>
                      }

                      {isUploadingImage && <>
                          <div className="w-16 h-16 object-cover rounded-lg border flex items-center justify-center">
                            <Loader2 className="w-4 h-4 animate-spin" />
                          </div>   
                        </>
                      }

                      
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
  )
}

export default CreateAutomation
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Loader2, Plus, Settings, Trash2, Upload, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs'
import { Label } from '../ui/Label'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { useDashboardStore } from '../../pages/Dashboard/useDashboardStore'


function AutomationSetup() {
    const { selectedReel,automationType,setAutomationType,title,
    textMessages,addTextMessage,removeTextMessage,updateTextMessage,
    handleImageUpload,editingId,cancelEdit, card , setCard, isUploadingImage} = useDashboardStore();
    
  return (<>
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
            <Tabs value={automationType || 'card'} onValueChange={(value) => setAutomationType(value)} className="w-full">
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
                        value={card.title}
                        onChange={(e) => setCard({...card , title : e.target.value})}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Card Subtitle</Label>
                        <Input
                        placeholder="Get 50% off on all products"
                        value={card.subtitle}
                        onChange={(e) => setCard({...card, subtitle : e.target.value})}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Button Title</Label>
                        <Input
                        placeholder="Shop Now"
                        value={card.button.title}
                        onChange={(e) => setCard({...card, button : {...card.button , title : e.target.value}} )}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Button URL</Label>
                        <Input
                        placeholder="https://your-store.com"
                        value={card.button.url}
                        onChange={(e) => setCard({...card, button : {...card.button , url : e.target.value} }) }
                        />
                    </div>
                    </div>

                    <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Upload Image</Label>
                        {card.cardImage ? (
                        <div className="space-y-3">
                            <div className="relative">
                                <img 
                                    src={card.cardImage} 
                                    alt="Card preview" 
                                    className="w-full h-48 object-cover rounded-lg border"
                                />
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={() => setCard({...card, cardImage : null})}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                            <p className="text-sm text-muted-foreground text-center">{title}</p>
                        </div>
                        ) : (
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                            {!isUploadingImage && <><input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="card-image"
                                />
                                <label htmlFor="card-image" className="cursor-pointer">
                                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground">
                                    Click to upload image
                                </p>
                                </label></>
                            }

                            {isUploadingImage && <>
                                <Loader2 className="w-8 h-8 text-muted-foreground mx-auto mb-2 animate-spin" />
                                <p className="text-sm text-muted-foreground">
                                    Uploading Image...
                                </p>
                            </>
                            }
                        </div>
                        )}
                    </div>
                    </div>
                </div>
                </TabsContent>

                <TabsContent value="text" className="space-y-4 mt-6">
                <div className="mb-4 p-3 bg-blue-300 border border-blue-200 rounded-lg">
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
    </>)
}

export default AutomationSetup
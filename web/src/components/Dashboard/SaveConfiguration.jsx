import { Loader2, Save, Sparkles } from "lucide-react"
import { Button } from "../ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"

function SaveConfiguration({selectedReel,saveReelAutomation,editingId,keyword,automationType,isSavingAutomation}) {
  return (
    <>
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
                disabled={!selectedReel || !keyword || !automationType}
                >
                {editingId ? (
                    <>
                        {!isSavingAutomation ? <><Save className="w-4 h-4 mr-2" />
                        Update Automation</> : 
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating Automation...</>
                    }
                    </>
                ) : (
                    <>
                    {!isSavingAutomation ? 
                        <><Sparkles className="w-4 h-4 mr-2" />
                        Save Reel Automation </> : 
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving Automation...</>
                    }
                    </>
                )}
                </Button>
                
                {(!selectedReel || !keyword || !automationType) && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                    Please select a reel, add a keyword, and choose automation type to save
                </p>
                )}
            </CardContent>
            </Card>
        )}
    </>
  )
}

export default SaveConfiguration
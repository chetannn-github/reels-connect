import { Loader2, Save, Sparkles } from "lucide-react"
import { Button } from "../ui/Button"
import { useDashboardStore } from "../../pages/Dashboard/useDashboardStore"

function SaveConfiguration() {
    const token = localStorage.getItem("jwt");
    const {saveReelAutomation,editingId,isSavingAutomation, isButtonDisabled} = useDashboardStore()
    return (
        <Button 
            onClick={() => saveReelAutomation(token)}
            className="w-full gradient-primary text-primary-foreground"
            size="lg"
            disabled={isButtonDisabled()}
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
  )
}

export default SaveConfiguration
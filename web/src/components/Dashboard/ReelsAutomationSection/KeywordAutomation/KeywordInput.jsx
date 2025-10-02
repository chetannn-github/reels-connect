import { useDashboardStore } from "../../../../pages/Dashboard/useDashboardStore";
import { Input } from "../../../ui/Input";
import { Label } from "../../../ui/Label";

function KeywordInput() {
    const {keyword, setKeyword} = useDashboardStore();
  return (
    <div className="gap-3">
        <div className="space-y-1">
            <Label className="text-sm">Trigger Keyword</Label>
            <Input
                placeholder="e.g. price, discount..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="h-9 placeholder:text-xs md:placeholder:text-sm text-sm md:text-md text text-xs md:text-md"
            />
        </div>
    </div>
  )
}

export default KeywordInput
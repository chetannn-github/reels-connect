import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';

import NoAutomation from './NoAutomation';
import ExistingAutomationCard from './ExistingAutomationCard';



function ExistingAutomations({existingAutomations,editingId, isDeleting, editAutomation,deleteAutomation}) {
  return (
    <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Active Automations</span>
                <Badge variant="secondary">{existingAutomations.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {existingAutomations.length === 0 ? (<NoAutomation/>
                ) : existingAutomations.map((automation) => (
                 <ExistingAutomationCard
                 automation = {automation} editingId = {editingId} key={automation._id} isDeleting={isDeleting}
                 editAutomation= {editAutomation} deleteAutomation={deleteAutomation}
                 />
                ))}
              </div>
            </CardContent>
          </Card>
  )
}

export default ExistingAutomations
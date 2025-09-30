import { MessageSquare } from 'lucide-react'
import React from 'react'

function NoAutomation() {
  return (
    <div className="text-center py-8 text-muted-foreground">
        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No automations created yet.</p>
    </div>
  )
}

export default NoAutomation
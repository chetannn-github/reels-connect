import React from 'react'

function Header() {
  return (
     <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            DM Automation Pro
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create intelligent keyword-based automated responses for your DMs. Set up text messages or rich card responses.
          </p>
    </div>
  )
}

export default Header
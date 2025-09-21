import React from 'react'
import HeroSection from '../components/HeroSection'
import UserJourney from '../components/UserJourney'

function Home() {
  return (
   <div className="min-h-screen">
      <HeroSection />
      <UserJourney />
      {/* <FeaturesSection />
      <PricingSection />
      <Footer /> */}
    </div>
  )
}

export default Home
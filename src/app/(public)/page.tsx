import React from 'react'

import { AboutLanding, HeroLanding } from '@/components/organisms/landing'
import { ContactLanding } from '@/components/organisms/landing/contact-landing'

export default function LandingPage() {
  return (
    <React.Fragment>
      <HeroLanding />
      <AboutLanding />
      <div className="h-screen" />
      <ContactLanding />
    </React.Fragment>
  )
}

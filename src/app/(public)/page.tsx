import React from 'react'

import { AboutLanding, ContactLanding, HeroLanding, ProjectLanding } from '@/components/organisms/landing'

export default function LandingPage() {
  return (
    <React.Fragment>
      <HeroLanding />
      <AboutLanding />
      <ProjectLanding />
      <ContactLanding />
    </React.Fragment>
  )
}

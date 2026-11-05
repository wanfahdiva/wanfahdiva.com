import React from 'react'

import { Folio } from '@/components/atoms/folio'
import { AboutLanding, ContactLanding, HeroLanding, ProjectLanding } from '@/components/organisms/landing'

export default function LandingPage() {
  return (
    <React.Fragment>
      <HeroLanding />
      <AboutLanding />
      <ProjectLanding />
      <ContactLanding />
      <Folio />
    </React.Fragment>
  )
}

import { lazy, Suspense } from 'react'
import { Navigation } from '@/components/Navigation'
import { GrainOverlay } from '@/components/GrainOverlay'
import { Hero } from '@/components/Hero'
import { SectionReveal } from '@/components/SectionReveal'

// Below-the-fold sections load in separate chunks so the hero paints first.
const About = lazy(() => import('@/components/About').then((m) => ({ default: m.About })))
const Timeline = lazy(() => import('@/components/Timeline').then((m) => ({ default: m.Timeline })))
const Certifications = lazy(() =>
  import('@/components/Certifications').then((m) => ({ default: m.Certifications })),
)
const Projects = lazy(() => import('@/components/Projects').then((m) => ({ default: m.Projects })))
const Contact = lazy(() => import('@/components/Contact').then((m) => ({ default: m.Contact })))

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <GrainOverlay />
      <Navigation />
      <main>
        <Hero />
        <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
          <SectionReveal><About /></SectionReveal>
          <SectionReveal><Timeline /></SectionReveal>
          <SectionReveal><Certifications /></SectionReveal>
          <SectionReveal><Projects /></SectionReveal>
          <SectionReveal><Contact /></SectionReveal>
        </Suspense>
      </main>
    </div>
  )
}

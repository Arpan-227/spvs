import { useEffect } from 'react'
import HeroSection       from '../../components/home/HeroSection'
import AnnounceBar       from '../../components/home/AnnounceBar'
import StatsSection      from '../../components/home/StatsSection'
import SchoolIntro       from '../../components/home/SchoolIntro'
import PrincipalMessage  from '../../components/home/PrincipalMessage'
import VisionMission     from '../../components/home/VisionMission'
import CurriculumSection from '../../components/home/CurriculumSection'
import ClassesOffered    from '../../components/home/ClassesOffered'
import FacilitiesPreview from '../../components/home/FacilitiesPreview'
import HostelSection     from '../../components/home/HostelSection'
import Testimonials      from '../../components/home/Testimonials'
import GallerySection    from '../../components/home/GallerySection'
import AlumniSection     from '../../components/home/AlumniSection'
import CTASection        from '../../components/home/CTASection'
import ContactSection    from '../../components/home/ContactSection'

export default function HomePage() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.rv, .rv3d').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <HeroSection />
      <AnnounceBar />
      <StatsSection />
      <SchoolIntro />
      <PrincipalMessage />
      <VisionMission />
      <CurriculumSection />
      <ClassesOffered />
      <FacilitiesPreview />
      <HostelSection />
      <Testimonials />
      <GallerySection />
      <AlumniSection />
      <CTASection />
      <ContactSection />
    </>
  )
}
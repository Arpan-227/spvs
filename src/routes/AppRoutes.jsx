import { Routes, Route } from 'react-router-dom'
import PublicLayout            from '../layouts/PublicLayout'
import AdminLayout             from '../layouts/AdminLayout'
import ProtectedRoute          from '../routes/ProtectedRoute'
import SiteStatusGuard         from '../components/common/SiteStatusGuard'

// Admin pages
import AdminLoginPage          from '../pages/admin/AdminLoginPage'
import DashboardPage           from '../pages/admin/DashboardPage'
import ManageBlogsPage         from '../pages/admin/ManageBlogsPage'
import ManageGalleryPage       from '../pages/admin/ManageGalleryPage'
import ManageFacultyPage       from '../pages/admin/ManageFacultyPage'
import ManageDownloadsPage     from '../pages/admin/ManageDownloadsPage'
import ManageAlumniPage        from '../pages/admin/ManageAlumniPage'
import ManageJobsPage          from '../pages/admin/ManageJobsPage'
import ManageApplicationsPage  from '../pages/admin/ManageApplicationsPage'
import ManageResultsPage       from '../pages/admin/ManageResultsPage'
import ManageCertificatesPage  from '../pages/admin/ManageCertificatesPage'
import ManageTestimonialsPage  from '../pages/admin/ManageTestimonialsPage'
import ManageAnnouncementsPage from '../pages/admin/ManageAnnouncementsPage'
import ManageEnquiriesPage     from '../pages/admin/ManageEnquiriesPage'
import ManageTransportPage     from '../pages/admin/ManageTransportPage'
import SettingsPage            from '../pages/admin/SettingsPage'
import ManageMandatoryPage     from '../pages/admin/ManageMandatoryPage'
import ManageAcademicsPage     from '../pages/admin/ManageAcademicsPage'

// Public pages
import HomePage                from '../pages/public/HomePage'
import AboutPage               from '../pages/public/AboutPage'
import AcademicsPage           from '../pages/public/AcademicsPage'
import ClassesInfra            from '../components/academics/ClassesInfra'
import SubjectList             from '../components/academics/SubjectList'
import FeeStructure            from '../components/academics/FeeStructure'
import TeachersQualification   from '../components/academics/TeachersQualification'
import FacilitiesPage          from '../pages/public/FacilitiesPage'
import Library                 from '../components/facilities/Library'
import Labs                    from '../components/facilities/Labs'
import Transport               from '../components/facilities/Transport'
import Playground              from '../components/facilities/Playground'
import SmartClasses            from '../components/facilities/SmartClasses'
import HostelHighlight         from '../components/facilities/HostelHighlight'
import ContactPage             from '../pages/public/ContactPage'
import CampusLifePage          from '../pages/public/CampusLifePage'
import WhyChooseUsPage         from '../pages/public/WhyChooseUsPage'
import BlogPage                from '../pages/public/BlogPage'
import BlogDetail              from '../components/blog/BlogDetail'
import CertificatePage         from '../pages/public/CertificatePage'
import AlumniPage              from '../pages/public/AlumniPage'
import MandatoryDisclosurePage from '../pages/public/MandatoryDisclosurePage'
import GalleryPage             from '../pages/public/GalleryPage'

function G({ children }) {
  return <SiteStatusGuard>{children}</SiteStatusGuard>
}

const NotFound = () => (
  <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'DM Sans,sans-serif', fontSize:'22px', color:'#7A4010', gap:'12px' }}>
    🚧 <strong>404 — Page Not Found</strong>
  </div>
)

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/"                       element={<G><HomePage /></G>} />
        <Route path="/about"                  element={<G><AboutPage /></G>} />
        <Route path="/about/history"          element={<G><AboutPage /></G>} />
        <Route path="/about/vision"           element={<G><AboutPage /></G>} />
        <Route path="/about/director"         element={<G><AboutPage /></G>} />
        <Route path="/about/principal"        element={<G><AboutPage /></G>} />
        <Route path="/about/faculty"          element={<G><AboutPage /></G>} />
        <Route path="/about/values"           element={<G><AboutPage /></G>} />
        <Route path="/academics"              element={<G><AcademicsPage /></G>} />
        <Route path="/academics/classes"      element={<G><ClassesInfra /></G>} />
        <Route path="/academics/subjects"     element={<G><SubjectList /></G>} />
        <Route path="/academics/fees"         element={<G><FeeStructure /></G>} />
        <Route path="/academics/faculty"      element={<G><TeachersQualification /></G>} />
        <Route path="/facilities"             element={<G><FacilitiesPage /></G>} />
        <Route path="/facilities/hostel"      element={<G><HostelHighlight /></G>} />
        <Route path="/facilities/library"     element={<G><Library /></G>} />
        <Route path="/facilities/labs"        element={<G><Labs /></G>} />
        <Route path="/facilities/transport"   element={<G><Transport /></G>} />
        <Route path="/facilities/playground"  element={<G><Playground /></G>} />
        <Route path="/facilities/smart-class" element={<G><SmartClasses /></G>} />
        <Route path="/blog"                   element={<G><BlogPage /></G>} />
        <Route path="/blog/:slug"             element={<G><BlogDetail /></G>} />
        <Route path="/downloads"              element={<G><CertificatePage /></G>} />
        <Route path="/gallery"                element={<G><GalleryPage /></G>} />
        <Route path="/alumni"                 element={<G><AlumniPage /></G>} />
        <Route path="/campus-life"            element={<G><CampusLifePage /></G>} />
        <Route path="/mandatory-disclosure"   element={<G><MandatoryDisclosurePage /></G>} />
        <Route path="/why-choose-us"          element={<G><WhyChooseUsPage /></G>} />
        <Route path="/contact"                element={<G><ContactPage /></G>} />
        <Route path="*"                       element={<NotFound />} />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/*" element={
        <ProtectedRoute>
          <AdminLayout>
            <Routes>
              <Route path="dashboard"     element={<DashboardPage />} />
              <Route path="blogs"         element={<ManageBlogsPage />} />
              <Route path="gallery"       element={<ManageGalleryPage />} />
              <Route path="faculty"       element={<ManageFacultyPage />} />
              <Route path="downloads"     element={<ManageDownloadsPage />} />
              <Route path="alumni"        element={<ManageAlumniPage />} />
              <Route path="jobs"          element={<ManageJobsPage />} />
              <Route path="applications"  element={<ManageApplicationsPage />} />
              <Route path="results"       element={<ManageResultsPage />} />
              <Route path="certificates"  element={<ManageCertificatesPage />} />
              <Route path="testimonials"  element={<ManageTestimonialsPage />} />
              <Route path="announcements" element={<ManageAnnouncementsPage />} />
              <Route path="enquiries"     element={<ManageEnquiriesPage />} />
              <Route path="transport"     element={<ManageTransportPage />} />
              <Route path="settings"      element={<SettingsPage />} />
              <Route path="mandatory"     element={<ManageMandatoryPage />} />
              <Route path="academics"     element={<ManageAcademicsPage />} />
              <Route path="*"             element={<DashboardPage />} />
            </Routes>
          </AdminLayout>
        </ProtectedRoute>
      } />
    </Routes>
  )
}
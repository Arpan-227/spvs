import { Routes, Route } from 'react-router-dom'
import PublicLayout           from '../layouts/PublicLayout'
import AdminLayout            from '../layouts/AdminLayout'
import ProtectedRoute         from '../routes/ProtectedRoute'

// Admin pages
import AdminLoginPage         from '../pages/admin/AdminLoginPage'
import DashboardPage          from '../pages/admin/DashboardPage'
import ManageBlogsPage        from '../pages/admin/ManageBlogsPage'
import GalleryPage             from '../pages/public/GalleryPage'
import ManageGalleryPage      from '../pages/admin/ManageGalleryPage'
import ManageFacultyPage      from '../pages/admin/ManageFacultyPage'
import ManageDownloadsPage    from '../pages/admin/ManageDownloadsPage'
import ManageAlumniPage       from '../pages/admin/ManageAlumniPage'
import ManageJobsPage         from '../pages/admin/ManageJobsPage'
import ManageResultsPage      from '../pages/admin/ManageResultsPage'
import ManageTestimonialsPage from '../pages/admin/ManageTestimonialsPage'
import ManageAnnouncementsPage from '../pages/admin/ManageAnnouncementsPage'
import ManageEnquiriesPage    from '../pages/admin/ManageEnquiriesPage'
import ManageTransportPage    from '../pages/admin/ManageTransportPage'
import SettingsPage           from '../pages/admin/SettingsPage'
import ManageMandatoryPage    from '../pages/admin/ManageMandatoryPage'
import ManageCertificatesPage  from '../pages/admin/ManageCertificatesPage'
import ManageAcademicsPage    from '../pages/admin/ManageAcademicsPage'
import HomePage               from '../pages/public/HomePage'

// About
import AboutPage              from '../pages/public/AboutPage'

// Academics
import AcademicsPage          from '../pages/public/AcademicsPage'
import ClassesInfra           from '../components/academics/ClassesInfra'
import SubjectList             from '../components/academics/SubjectList'
import FeeStructure            from '../components/academics/FeeStructure'
import TeachersQualification   from '../components/academics/TeachersQualification'

// Contact
import ContactPage            from '../pages/public/ContactPage'

// Campus Life & Jobs
import CampusLifePage         from '../pages/public/CampusLifePage'

// Why Choose Us
import WhyChooseUsPage        from '../pages/public/WhyChooseUsPage'

// Blog
import BlogPage                from '../pages/public/BlogPage'
import BlogDetail              from '../components/blog/BlogDetail'

// Certificate
import CertificatePage         from '../pages/public/CertificatePage'

// Alumni
import AlumniPage              from '../pages/public/AlumniPage'

// Mandatory Disclosure
import MandatoryDisclosurePage from '../pages/public/MandatoryDisclosurePage'

// Facilities
import FacilitiesPage         from '../pages/public/FacilitiesPage'
import Library                from '../components/facilities/Library'
import Labs                   from '../components/facilities/Labs'
import Transport               from '../components/facilities/Transport'
import Playground              from '../components/facilities/Playground'
import SmartClasses            from '../components/facilities/SmartClasses'
import HostelHighlight         from '../components/facilities/HostelHighlight'

const ComingSoon = ({ page }) => (
  <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'DM Sans,sans-serif',fontSize:'22px',color:'#7A4010',gap:'12px'}}>
    🚧 <strong>{page}</strong> — Coming Soon
  </div>
)

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>

        {/* ── HOME ── */}
        <Route path="/"                       element={<HomePage />} />

        {/* ── ACADEMICS ── */}
        <Route path="/academics"              element={<AcademicsPage />} />
        <Route path="/academics/classes"      element={<ClassesInfra />} />
        <Route path="/academics/subjects"     element={<SubjectList />} />
        <Route path="/academics/fees"         element={<FeeStructure />} />
        <Route path="/academics/faculty"      element={<TeachersQualification />} />

        {/* ── FACILITIES ── */}
        <Route path="/facilities"             element={<FacilitiesPage />} />
        <Route path="/facilities/hostel"      element={<HostelHighlight />} />
        <Route path="/facilities/library"     element={<Library />} />
        <Route path="/facilities/labs"        element={<Labs />} />
        <Route path="/facilities/transport"   element={<Transport />} />
        <Route path="/facilities/playground"  element={<Playground />} />
        <Route path="/facilities/smart-class" element={<SmartClasses />} />

        {/* ── ABOUT ── */}
        <Route path="/about"                    element={<AboutPage />} />
        <Route path="/about/history"            element={<AboutPage />} />
        <Route path="/about/vision"             element={<AboutPage />} />
        <Route path="/about/director"           element={<AboutPage />} />
        <Route path="/about/principal"          element={<AboutPage />} />
        <Route path="/about/faculty"            element={<AboutPage />} />
        <Route path="/about/values"             element={<AboutPage />} />
        <Route path="/blog"                   element={<BlogPage />} />
        <Route path="/blog/:slug"             element={<BlogDetail />} />
        <Route path="/downloads"              element={<CertificatePage />} />
        <Route path="/gallery"                element={<GalleryPage />} />
        <Route path="/alumni"                 element={<AlumniPage />} />
        <Route path="/campus-life"            element={<CampusLifePage />} />
        <Route path="/jobs"                   element={<ComingSoon page="Jobs & Careers" />} />
        <Route path="/mandatory-disclosure"   element={<MandatoryDisclosurePage />} />
        <Route path="/why-choose-us"          element={<WhyChooseUsPage />} />
        <Route path="/contact"                element={<ContactPage />} />

      </Route>

      {/* ── ADMIN ROUTES ── */}
      <Route path="/admin/login"   element={<AdminLoginPage />} />
      <Route path="/admin/*" element={
        <ProtectedRoute>
          <AdminLayout>
            <Routes>
              <Route path="dashboard"    element={<DashboardPage />} />
              <Route path="blogs"        element={<ManageBlogsPage />} />
              <Route path="gallery"      element={<ManageGalleryPage />} />
              <Route path="faculty"      element={<ManageFacultyPage />} />
              <Route path="downloads"    element={<ManageDownloadsPage />} />
              <Route path="alumni"       element={<ManageAlumniPage />} />
              <Route path="jobs"         element={<ManageJobsPage />} />
              <Route path="results"      element={<ManageResultsPage />} />
              <Route path="testimonials" element={<ManageTestimonialsPage />} />
              <Route path="announcements"element={<ManageAnnouncementsPage />} />
              <Route path="enquiries"    element={<ManageEnquiriesPage />} />
              <Route path="transport"    element={<ManageTransportPage />} />
              <Route path="settings"     element={<SettingsPage />} />
              <Route path="mandatory"    element={<ManageMandatoryPage />} />
              <Route path="academics"    element={<ManageAcademicsPage />} />
              <Route path="*"            element={<DashboardPage />} />
            </Routes>
          </AdminLayout>
        </ProtectedRoute>
      } />

      {/* 404 catch-all */}
      <Route path="*" element={<ComingSoon page="404 — Page Not Found" />} />

    </Routes>
  )
}
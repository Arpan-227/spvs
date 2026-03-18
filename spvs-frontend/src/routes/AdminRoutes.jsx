import { Routes, Route } from 'react-router-dom'
import PublicLayout           from '../layouts/PublicLayout'
import AdminLayout            from '../layouts/AdminLayout'
import ProtectedRoute         from '../components/common/ProtectedRoute'

// Admin pages
import AdminLoginPage         from '../pages/admin/AdminLoginPage'
import DashboardPage          from '../pages/admin/DashboardPage'
import HomePage               from '../pages/public/HomePage'

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

// Downloads
import DownloadsPage           from '../pages/public/DownloadsPage'

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

        {/* ── OTHER PAGES ── */}
        <Route path="/about"                  element={<ComingSoon page="About Us" />} />
        <Route path="/blog"                   element={<BlogPage />} />
        <Route path="/blog/:slug"             element={<BlogDetail />} />
        <Route path="/downloads"              element={<DownloadsPage />} />
        <Route path="/gallery"                element={<ComingSoon page="Gallery" />} />
        <Route path="/alumni"                 element={<AlumniPage />} />
        <Route path="/campus-life"            element={<CampusLifePage />} />
        <Route path="/jobs"                   element={<ComingSoon page="Jobs & Careers" />} />
        <Route path="/mandatory-disclosure"   element={<MandatoryDisclosurePage />} />
        <Route path="/why-choose-us"          element={<WhyChooseUsPage />} />
        <Route path="/contact"                element={<ContactPage />} />
        <Route path="*"                       element={<ComingSoon page="404 — Page Not Found" />} />

      </Route>

      {/* ── ADMIN ROUTES ── */}
      <Route path="/admin/login"   element={<AdminLoginPage />} />
      <Route path="/admin/*" element={
        <ProtectedRoute>
          <AdminLayout>
            <Routes>
              <Route path="dashboard"    element={<DashboardPage />} />
              <Route path="blogs"        element={<DashboardPage />} />
              <Route path="gallery"      element={<DashboardPage />} />
              <Route path="faculty"      element={<DashboardPage />} />
              <Route path="downloads"    element={<DashboardPage />} />
              <Route path="alumni"       element={<DashboardPage />} />
              <Route path="jobs"         element={<DashboardPage />} />
              <Route path="results"      element={<DashboardPage />} />
              <Route path="testimonials" element={<DashboardPage />} />
              <Route path="announcements"element={<DashboardPage />} />
              <Route path="enquiries"    element={<DashboardPage />} />
              <Route path="transport"    element={<DashboardPage />} />
              <Route path="settings"     element={<DashboardPage />} />
              <Route path="*"            element={<DashboardPage />} />
            </Routes>
          </AdminLayout>
        </ProtectedRoute>
      } />

    </Routes>
  )
}
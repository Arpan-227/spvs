import { HashRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Preloader from './components/common/Preloader'
import { AuthProvider } from './context/AuthContext'
import './index.css'


function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Preloader />
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  )
}

export default App
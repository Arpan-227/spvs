import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Preloader from './components/common/Preloader'
import { AuthProvider } from './context/AuthContext'
import './index.css'

const basename = import.meta.env.PROD ? '/spvs-frontend' : '/'

function App() {
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <Preloader />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
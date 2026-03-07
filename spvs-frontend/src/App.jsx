import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Preloader from './components/common/Preloader'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <AppRoutes />
    </BrowserRouter>
  )
}
export default App
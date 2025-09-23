import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import PublicationsPage from './pages/PublicationsPage'
import Team from './pages/TeamPage'
import CnDPage from './pages/CnDPage'
import BrainMeshViewer from './components/BrainMeshViewer'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/code-and-data" element={<CnDPage />} />
          <Route path="/app" element={<BrainMeshViewer />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

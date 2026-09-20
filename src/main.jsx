import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
// Las tipografias viajan con la pagina (licencia OFL). Ninguna peticion sale
// hacia un tercero para pintar una letra.
import './fuentes.css'
import '@fontsource/montserrat/latin-400.css'
import '@fontsource/montserrat/latin-500.css'
import '@fontsource/montserrat/latin-600.css'
import '@fontsource/montserrat/latin-700.css'
import './theme.css'
import './app.css'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Tienda from './pages/Tienda.jsx'
import Carrito from './pages/Carrito.jsx'
import Club from './pages/Club.jsx'

function ArribaAlCambiar() {
  const { pathname } = useLocation()
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <ArribaAlCambiar />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/club" element={<Club />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </MotionConfig>
  </React.StrictMode>,
)

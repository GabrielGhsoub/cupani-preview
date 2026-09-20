import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { bodega } from '../data/vinos.js'
import { useCarrito } from '../store.js'

const LOGO = import.meta.env.BASE_URL + 'img/logotipo.webp'
const PREVIEW = import.meta.env.VITE_PREVIEW === '1'

// Solo aparece en la compilacion de vista previa (la que vive en GitHub Pages).
// La version que se instalaria en su alojamiento no lo lleva.
export function Lazo() {
  if (!PREVIEW) return null
  return (
    <div className="lazo" aria-hidden="true">
      Vista previa
    </div>
  )
}

export function BandaDemo() {
  return (
    <div className="banda" role="note">
      <span className="banda__punto" aria-hidden="true" />
      <p>
        <strong>Demostración privada para Cupani.</strong> Nada de lo que haga aquí compra, cobra ni
        envía nada.
      </p>
    </div>
  )
}

export function Cabecera() {
  const botellas = useCarrito((s) => Object.values(s.lineas).reduce((a, b) => a + b, 0))
  return (
    <header className="cab">
      <div className="wrap cab__in">
        <Link to="/" className="cab__logo" aria-label="Cupani, inicio">
          <img src={LOGO} alt="Cupani" width="1087" height="167" />
        </Link>
        <nav className="cab__nav" aria-label="Principal">
          <NavLink to="/tienda">Tienda</NavLink>
          <NavLink to="/club">Club de cosecha</NavLink>
          <a href={bodega.visitas} target="_blank" rel="noreferrer">
            Visitas
          </a>
          <Link to="/carrito" className="cab__cesta">
            Cesta
            {botellas > 0 && (
              <motion.span
                key={botellas}
                className="cab__contador"
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 420, damping: 18 }}
              >
                {botellas}
              </motion.span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export function Pie() {
  return (
    <footer className="pie">
      <div className="wrap pie__in">
        <div>
          <p className="pie__nombre">{bodega.nombre}</p>
          <p className="pie__linea">
            {bodega.calle}, {bodega.cp} {bodega.municipio} ({bodega.provincia})
          </p>
          <p className="pie__linea">
            <a href={`mailto:${bodega.email}`}>{bodega.email}</a>{' '}
            <span aria-hidden="true">·</span>{' '}
            <a href={bodega.sitio} target="_blank" rel="noreferrer">
              cupani.es
            </a>
          </p>
        </div>
        <div className="pie__legal">
          <p>
            Venta de bebidas alcohólicas solo a mayores de 18 años. Disfruta siempre con
            responsabilidad.
          </p>
          <p className="pie__likwiid">Hecho por Likwiid</p>
        </div>
      </div>
    </footer>
  )
}

export default function Layout({ children }) {
  const { pathname } = useLocation()
  return (
    <>
      <a className="salto" href="#principal">
        Ir al contenido
      </a>
      <Lazo />
      <BandaDemo />
      <Cabecera />
      <motion.main
        id="principal"
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 0.9, 0.24, 1] }}
      >
        {children}
      </motion.main>
      <Pie />
    </>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { bodega } from '../data/vinos.js'

const HERO = import.meta.env.BASE_URL + 'img/vinedo.jpg'
const LOGO = import.meta.env.BASE_URL + 'img/logotipo.webp'

export default function Home() {
  return (
    <>
      <section className="hero">
        <img
          className="hero__foto"
          src={HERO}
          alt="Viñedo de Cupani en San Vicente de la Sonsierra"
          width="1600"
          height="900"
        />
        <div className="hero__velo" aria-hidden="true" />
        <div className="wrap hero__in">
          <h1 className="hero__titulo">
            <motion.img
              className="hero__logo"
              src={LOGO}
              alt="Cupani"
              width="1087"
              height="167"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 0.9, 0.24, 1] }}
            />
          </h1>
          <motion.p
            className="hero__lugar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            San Vicente de la Sonsierra, La Rioja
          </motion.p>
          <motion.div
            className="hero__botones"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.55 }}
          >
            <Link className="btn btn--rioja" to="/tienda">
              Comprar vino
            </Link>
            <Link className="btn btn--claro" to="/club">
              Club de cosecha
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="wrap intro">
        <p className="kicker">Cinco vinos, tres fincas</p>
        <h2>Toda la bodega cabe en 9.747 botellas y 100 magnums.</h2>
        <p className="intro__texto">
          Es la suma de las producciones que declaran sus propias fichas técnicas: 1.628 de Rielo,
          4.874 y 100 magnums de Cupani, 619 de Cupani Garnacha, 1.620 de Baskunes y 1.006 de Sir
          Cupani. Vendimia manual, cepas plantadas entre 1917 y 1982, viñedos entre 525 y 580 metros
          en San Andrés, San Prudencio y Mojón de Labastida.
        </p>
        <p className="intro__nota">
          Todo lo que se lee aquí sale de esas cinco fichas en pdf y de las contraetiquetas que
          aparecen fotografiadas en ellas. Los precios no: esos son inventados y van marcados uno por
          uno.
        </p>
      </section>

      <section className="wrap puertas">
        <Link to="/tienda" className="puerta">
          <span className="kicker">Tienda</span>
          <h3>Los cinco vinos, con envío a casa</h3>
          <p>
            Cada vino con su añada, su uva, su finca y un enlace a su ficha técnica, la misma que ya
            está publicada en cupani.es.
          </p>
          <span className="puerta__flecha" aria-hidden="true">
            &rarr;
          </span>
        </Link>
        <Link to="/club" className="puerta">
          <span className="kicker">Club de cosecha</span>
          <h3>Reservar botellas de la próxima añada</h3>
          <p>
            De la Garnacha 2024 salieron 619 botellas. Con esos números, quien la quiere tiene que
            apuntarse antes. Aquí se deja dicho cuántas y de qué vino, sin pagar nada.
          </p>
          <span className="puerta__flecha" aria-hidden="true">
            &rarr;
          </span>
        </Link>
      </section>

      <section className="wrap visita">
        <p>
          Las visitas guiadas se quedan donde están, en{' '}
          <a href={bodega.visitas} target="_blank" rel="noreferrer">
            cupani.es/visitas
          </a>
          , con su formulario y su día de visita. Esta demostración no las toca.
        </p>
      </section>
    </>
  )
}

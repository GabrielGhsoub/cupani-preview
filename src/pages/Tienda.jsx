import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { vinos, envio, eur } from '../data/vinos.js'
import { useCarrito } from '../store.js'
import { IconoMas, IconoMenos } from '../components/Iconos.jsx'

function Ficha({ vino }) {
  const anadir = useCarrito((s) => s.anadir)
  const enCesta = useCarrito((s) => s.lineas[vino.slug] || 0)
  const [n, setN] = useState(1)
  const [hecho, setHecho] = useState(false)

  const meter = () => {
    anadir(vino.slug, n)
    setHecho(true)
    setTimeout(() => setHecho(false), 1600)
  }

  return (
    <motion.article
      className="vino"
      style={{ '--acento': vino.acento }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.45, ease: [0.22, 0.9, 0.24, 1] }}
    >
      <div className="vino__foto">
        <img src={vino.img} alt={`Botella de ${vino.nombre} ${vino.anada}`} width="360" height="900" loading="lazy" />
      </div>

      <div className="vino__texto">
        <p className="vino__tipo">
          {vino.tipo} <span aria-hidden="true">·</span> {vino.do}
        </p>
        <h3 className="vino__nombre">
          {vino.nombre} <span className="vino__anada">{vino.anada}</span>
        </h3>

        <dl className="vino__datos">
          <div>
            <dt>Uva</dt>
            <dd>{vino.uva}</dd>
          </div>
          <div>
            <dt>Viña</dt>
            <dd>{vino.finca}, plantada en {vino.plantacion}</dd>
          </div>
          <div>
            <dt>Altitud</dt>
            <dd>{vino.altitud}</dd>
          </div>
          <div>
            <dt>Grado</dt>
            <dd>{vino.alcohol}</dd>
          </div>
          <div>
            <dt>Producción</dt>
            <dd>{vino.produccion}</dd>
          </div>
        </dl>

        <p className="vino__nota">{vino.nota1}</p>
        <p className="vino__nota">{vino.nota2}</p>

        <p className="vino__cata">
          <span className="vino__cataetiqueta">Nota de cata de su ficha</span>
          {vino.cata}
        </p>

        <a className="vino__pdf" href={vino.ficha} target="_blank" rel="noreferrer">
          Ficha técnica en pdf
        </a>

        <div className="vino__compra">
          <p className="vino__precio">
            <span className="vino__cifra">{eur(vino.precio)}</span>
            <span className="vino__unidad">la botella</span>
            <span className="ejemplo">Ejemplo</span>
          </p>

          <div className="vino__acciones">
            <div className="cant" role="group" aria-label={`Botellas de ${vino.nombre}`}>
              <button type="button" onClick={() => setN(Math.max(1, n - 1))} aria-label="Quitar una botella">
                <IconoMenos />
              </button>
              <input
                type="number"
                min="1"
                max="24"
                value={n}
                aria-label={`Botellas de ${vino.nombre}`}
                onChange={(e) => setN(Math.max(1, Math.min(24, Number(e.target.value) || 1)))}
              />
              <button type="button" onClick={() => setN(Math.min(24, n + 1))} aria-label="Añadir una botella">
                <IconoMas />
              </button>
            </div>
            <button type="button" className="btn btn--tinta" onClick={meter} data-add={vino.slug}>
              Añadir a la cesta
            </button>
          </div>

          <div className="vino__aviso" aria-live="polite">
            <AnimatePresence>
              {hecho && (
                <motion.span
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  En la cesta: {enCesta} {enCesta === 1 ? 'botella' : 'botellas'}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Tienda() {
  const botellas = useCarrito((s) => Object.values(s.lineas).reduce((a, b) => a + b, 0))
  const total = useCarrito((s) => s.total())

  return (
    <>
      <section className="wrap encabezado">
        <p className="kicker">Tienda</p>
        <h1>Los cinco vinos</h1>
        <p className="encabezado__bajada">
          Cada dato de estas cinco tarjetas sale de la ficha técnica en pdf de ese mismo vino, la que
          ya está enlazada en cupani.es. El enlace de cada tarjeta lleva al pdf original, sin copia.
        </p>
        <p className="encabezado__precios">
          <span className="ejemplo">Ejemplo</span> Los precios son un ejemplo; los suyos se ponen en
          un minuto.
        </p>
        <p className="encabezado__cata">
          Las notas de cata están en la cara inglesa de sus fichas. Aquí van traducidas, sin añadir
          nada.
        </p>
      </section>

      <section className="wrap lista">
        {vinos.map((v) => (
          <Ficha key={v.slug} vino={v} />
        ))}
      </section>

      <section className="wrap portes">
        <h2>El envío</h2>
        <ul>
          <li>
            <span className="ejemplo">Ejemplo</span> Península: {eur(envio.peninsula)} por pedido.
          </li>
          <li>
            <span className="ejemplo">Ejemplo</span> Envío gratis a partir de {envio.gratisDesde}{' '}
            botellas.
          </li>
          <li>
            <span className="ejemplo">Ejemplo</span> Pedido mínimo: {envio.minimo} botellas.
          </li>
        </ul>
        <p className="portes__nota">
          La bodega no publica condiciones de envío, así que estas tres líneas también son
          inventadas. Dígame las suyas y quedan puestas.
        </p>
      </section>

      {botellas > 0 && (
        <motion.div
          className="barra"
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        >
          <div className="wrap barra__in">
            <p>
              {botellas} {botellas === 1 ? 'botella' : 'botellas'}
              <span className="barra__total">{eur(total)}</span>
              <span className="ejemplo">Ejemplo</span>
            </p>
            <Link className="btn btn--rioja" to="/carrito">
              Ver la cesta
            </Link>
          </div>
        </motion.div>
      )}
    </>
  )
}

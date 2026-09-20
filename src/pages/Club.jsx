import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { vinos, bodega } from '../data/vinos.js'
import { useClub } from '../store.js'
import { IconoMas, IconoMenos, IconoVisto } from '../components/Iconos.jsx'

const CEPAS = import.meta.env.BASE_URL + 'img/cepas.jpg'
const VACIO = { nombre: '', email: '', telefono: '', nota: '' }

export default function Club() {
  const [datos, setDatos] = useState(VACIO)
  const [fallos, setFallos] = useState({})
  const [enviado, setEnviado] = useState(null)

  const reservas = useClub((s) => s.reservas)
  const fijar = useClub((s) => s.fijar)
  const vaciar = useClub((s) => s.vaciar)
  const lineas = useClub((s) => s.lineas())
  const botellas = useClub((s) => s.botellas())

  const cambiar = (k) => (e) => setDatos({ ...datos, [k]: e.target.value })

  const mandar = (e) => {
    e.preventDefault()
    const f = {}
    if (botellas === 0) f.botellas = 'Apunte al menos una botella'
    if (datos.nombre.trim().length < 3) f.nombre = 'Hace falta un nombre'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(datos.email.trim())) f.email = 'Revise el correo'
    setFallos(f)
    if (Object.keys(f).length) return
    setEnviado({
      ref: 'EJEMPLO' + String(Math.floor(Math.random() * 9000) + 1000),
      lineas: lineas.map(({ vino, n }) => ({ nombre: vino.nombre, n })),
      botellas,
      datos,
    })
    vaciar()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (enviado) {
    return (
      <section className="wrap wrap--fino pantalla">
        <motion.div
          className="hecho"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="hecho__marca" aria-hidden="true">
            <IconoVisto />
          </span>
          <h1>Aquí terminaría la petición</h1>
          <p className="hecho__aviso">
            No hay nada reservado y no se ha cobrado nada. Tampoco se ha enviado ningún correo. Esto
            es una demostración.
          </p>

          <div className="sobre">
            <p className="sobre__de">Lo que le llegaría a {bodega.email}</p>
            <table className="sobre__tabla">
              <tbody>
                <tr>
                  <th scope="row">Referencia</th>
                  <td>{enviado.ref}</td>
                </tr>
                <tr>
                  <th scope="row">Quien pide</th>
                  <td>{enviado.datos.nombre}</td>
                </tr>
                <tr>
                  <th scope="row">Correo</th>
                  <td>{enviado.datos.email}</td>
                </tr>
                {enviado.datos.telefono && (
                  <tr>
                    <th scope="row">Teléfono</th>
                    <td>{enviado.datos.telefono}</td>
                  </tr>
                )}
                <tr>
                  <th scope="row">Reserva</th>
                  <td>
                    {enviado.lineas.map((l) => (
                      <span key={l.nombre} className="sobre__linea">
                        {l.n} {l.n === 1 ? 'botella' : 'botellas'} de {l.nombre}
                      </span>
                    ))}
                    <span className="sobre__linea sobre__total">
                      {enviado.botellas} {enviado.botellas === 1 ? 'botella' : 'botellas'} en total
                    </span>
                  </td>
                </tr>
                {enviado.datos.nota && (
                  <tr>
                    <th scope="row">Nota</th>
                    <td>{enviado.datos.nota}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="hecho__nota">
            En la versión de verdad esta petición cae en su correo con la lista ya sumada, usted
            contesta si la acepta y el precio se cierra cuando usted quiera. Ninguna botella sale de
            la bodega sin que usted diga que sí.
          </p>

          <div className="hecho__botones">
            <Link className="btn btn--tinta" to="/tienda">
              Ver los vinos
            </Link>
            <button type="button" className="btn btn--ghost" onClick={() => { setEnviado(null); setDatos(VACIO) }}>
              Probar otra vez
            </button>
          </div>
        </motion.div>
      </section>
    )
  }

  return (
    <>
      <section className="clubhero">
        <img src={CEPAS} alt="Cepas en vaso en la finca de Cupani" width="1400" height="788" />
        <div className="clubhero__velo" aria-hidden="true" />
        <div className="wrap clubhero__in">
          <p className="kicker kicker--claro">Club de cosecha</p>
          <h1>Apalabrar la añada que viene</h1>
        </div>
      </section>

      <section className="wrap wrap--fino pantalla">
        <p className="pantalla__bajada">
          De la Garnacha 2024 salieron 619 botellas y del Sir Cupani 2023, 1.006. Con esos números,
          el que llega tarde se queda sin vino y usted se entera de la demanda cuando ya está
          embotellado. Esto le deja saber antes cuánto vino tiene pedido.
        </p>
        <p className="aviso aviso--ojo">
          Aquí no se paga, no se pide ninguna tarjeta y no se reserva nada de verdad. Es una petición
          y nada más.
        </p>

        <form onSubmit={mandar} noValidate>
          <h2 className="club__h2">Cuántas botellas de cada vino</h2>
          <ul className="club__lista">
            {vinos.map((v) => {
              const n = reservas[v.slug] || 0
              return (
                <li key={v.slug} className={`club__fila${n > 0 ? ' club__fila--si' : ''}`} style={{ '--acento': v.acento }}>
                  <img src={v.img} alt="" width="40" height="100" loading="lazy" />
                  <div className="club__quien">
                    <p className="club__nombre">{v.nombre}</p>
                    <p className="club__sub">
                      {v.uva} <span aria-hidden="true">·</span> última añada {v.anada},{' '}
                      {v.produccion}
                    </p>
                  </div>
                  <div className="cant" role="group" aria-label={`Botellas de ${v.nombre}`}>
                    <button type="button" onClick={() => fijar(v.slug, n - 1)} aria-label={`Quitar una botella de ${v.nombre}`}>
                      <IconoMenos />
                    </button>
                    <input
                      type="number"
                      min="0"
                      max="12"
                      value={n}
                      aria-label={`Botellas de ${v.nombre}`}
                      data-club={v.slug}
                      onChange={(e) => fijar(v.slug, e.target.value)}
                    />
                    <button type="button" onClick={() => fijar(v.slug, n + 1)} aria-label={`Añadir una botella de ${v.nombre}`}>
                      <IconoMas />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="club__suma" aria-live="polite">
            <span>En su petición</span>
            <AnimatePresence mode="popLayout">
              <motion.strong
                key={botellas}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {botellas} {botellas === 1 ? 'botella' : 'botellas'}
              </motion.strong>
            </AnimatePresence>
          </div>
          <p className="club__sinprecio">
            Sin importe: el precio de la añada que viene lo pone usted cuando la embotelle.
          </p>
          {fallos.botellas && <em className="campo__fallo campo__fallo--suelto">{fallos.botellas}</em>}

          <h2 className="club__h2">Quién la pide</h2>
          <div className="campos">
            <label className="campo campo--ancho">
              <span>Nombre y apellidos</span>
              <input name="nombre" autoComplete="off" value={datos.nombre} onChange={cambiar('nombre')} />
              {fallos.nombre && <em className="campo__fallo">{fallos.nombre}</em>}
            </label>
            <label className="campo">
              <span>Correo</span>
              <input name="email" inputMode="email" autoComplete="off" value={datos.email} onChange={cambiar('email')} />
              {fallos.email && <em className="campo__fallo">{fallos.email}</em>}
            </label>
            <label className="campo">
              <span>Teléfono, si quiere</span>
              <input name="telefono" inputMode="tel" autoComplete="off" value={datos.telefono} onChange={cambiar('telefono')} />
            </label>
            <label className="campo campo--ancho">
              <span>Algo que quiera decir</span>
              <textarea name="nota" rows="3" value={datos.nota} onChange={cambiar('nota')} />
            </label>
          </div>

          <button type="submit" className="btn btn--rioja btn--ancho" data-next="club">
            Enviar la petición
          </button>
          <p className="club__pie">
            Nada se cobra y nada queda reservado. En la versión de verdad, la petición le llega a{' '}
            {bodega.email} y usted decide.
          </p>
        </form>
      </section>
    </>
  )
}

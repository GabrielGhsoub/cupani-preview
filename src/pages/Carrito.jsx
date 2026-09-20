import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { envio, eur, bodega } from '../data/vinos.js'
import { useCarrito } from '../store.js'
import { IconoMas, IconoMenos, IconoVisto } from '../components/Iconos.jsx'

const PASOS = ['Cesta', 'Envío', 'Pago', 'Hecho']

function Pasos({ paso }) {
  return (
    <ol className="pasos" aria-label="Pasos del pedido">
      {PASOS.map((p, i) => (
        <li key={p} className={i === paso ? 'es' : i < paso ? 'ya' : ''} aria-current={i === paso ? 'step' : undefined}>
          <span className="pasos__n">{i < paso ? <IconoVisto /> : i + 1}</span>
          <span className="pasos__t">{p}</span>
        </li>
      ))}
    </ol>
  )
}

function Resumen({ lineas, subtotal, portes, total, botellas }) {
  return (
    <div className="resumen">
      <h3>Su pedido</h3>
      <ul className="resumen__lineas">
        {lineas.map(({ vino, n }) => (
          <li key={vino.slug}>
            <span className="resumen__vino">
              {n} <span aria-hidden="true">x</span> {vino.nombre} {vino.anada}
            </span>
            <span className="resumen__cifra">
              {eur(vino.precio * n)} <span className="ejemplo">Ejemplo</span>
            </span>
          </li>
        ))}
      </ul>
      <dl className="resumen__totales">
        <div>
          <dt>Vino</dt>
          <dd>
            {eur(subtotal)} <span className="ejemplo">Ejemplo</span>
          </dd>
        </div>
        <div>
          <dt>Envío a península</dt>
          <dd>
            {portes === 0 ? 'Incluido' : eur(portes)} <span className="ejemplo">Ejemplo</span>
          </dd>
        </div>
        <div className="resumen__final">
          <dt>Total</dt>
          <dd>
            {eur(total)} <span className="ejemplo">Ejemplo</span>
          </dd>
        </div>
      </dl>
      <p className="resumen__pie">
        {botellas} {botellas === 1 ? 'botella' : 'botellas'}. Envío gratis a partir de{' '}
        {envio.gratisDesde}, y {eur(envio.peninsula)} por debajo. Las dos cifras son inventadas.
      </p>
    </div>
  )
}

const VACIO = { nombre: '', direccion: '', cp: '', poblacion: '', telefono: '', email: '' }

export default function Carrito() {
  const [paso, setPaso] = useState(0)
  const [datos, setDatos] = useState(VACIO)
  const [fallos, setFallos] = useState({})
  const [cobrando, setCobrando] = useState(false)
  const [pedido, setPedido] = useState(null)

  const lineas = useCarrito((s) => s.articulos())
  const fijar = useCarrito((s) => s.fijar)
  const quitar = useCarrito((s) => s.quitar)
  const vaciar = useCarrito((s) => s.vaciar)
  const subtotal = useCarrito((s) => s.subtotal())
  const portes = useCarrito((s) => s.portes())
  const total = useCarrito((s) => s.total())
  const botellas = useCarrito((s) => s.botellas())

  const bajoMinimo = botellas > 0 && botellas < envio.minimo

  const cambiar = (k) => (e) => setDatos({ ...datos, [k]: e.target.value })

  const validar = () => {
    const f = {}
    if (datos.nombre.trim().length < 3) f.nombre = 'Hace falta un nombre'
    if (datos.direccion.trim().length < 5) f.direccion = 'Hace falta una dirección'
    if (!/^\d{5}$/.test(datos.cp.trim())) f.cp = 'Cinco cifras'
    if (datos.poblacion.trim().length < 2) f.poblacion = 'Hace falta la población'
    if (datos.telefono.replace(/\D/g, '').length < 9) f.telefono = 'Nueve cifras como mínimo'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(datos.email.trim())) f.email = 'Revise el correo'
    setFallos(f)
    return Object.keys(f).length === 0
  }

  const aPago = (e) => {
    e.preventDefault()
    if (validar()) setPaso(2)
  }

  const simularPago = () => {
    setCobrando(true)
    setTimeout(() => {
      setPedido({
        ref: 'EJEMPLO' + String(Math.floor(Math.random() * 9000) + 1000),
        lineas: lineas.map(({ vino, n }) => ({ nombre: vino.nombre, anada: vino.anada, n, importe: vino.precio * n })),
        subtotal,
        portes,
        total,
        botellas,
        datos,
      })
      setCobrando(false)
      setPaso(3)
      vaciar()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 900)
  }

  if (paso === 3 && pedido) {
    return (
      <section className="wrap wrap--fino pantalla">
        <Pasos paso={3} />
        <motion.div
          className="hecho"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="hecho__marca" aria-hidden="true">
            <IconoVisto />
          </span>
          <h1>Aquí terminaría el pedido</h1>
          <p className="hecho__aviso">
            No se ha cobrado nada, no se ha enviado ningún correo y no hay ningún vino reservado.
            Esto es una demostración.
          </p>

          <div className="sobre">
            <p className="sobre__de">Lo que le llegaría a {bodega.email}</p>
            <table className="sobre__tabla">
              <tbody>
                <tr>
                  <th scope="row">Referencia</th>
                  <td>{pedido.ref}</td>
                </tr>
                <tr>
                  <th scope="row">Cliente</th>
                  <td>{pedido.datos.nombre}</td>
                </tr>
                <tr>
                  <th scope="row">Dirección</th>
                  <td>
                    {pedido.datos.direccion}, {pedido.datos.cp} {pedido.datos.poblacion}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Teléfono</th>
                  <td>{pedido.datos.telefono}</td>
                </tr>
                <tr>
                  <th scope="row">Correo</th>
                  <td>{pedido.datos.email}</td>
                </tr>
                <tr>
                  <th scope="row">Vinos</th>
                  <td>
                    {pedido.lineas.map((l) => (
                      <span key={l.nombre} className="sobre__linea">
                        {l.n} <span aria-hidden="true">x</span> {l.nombre} {l.anada}, {eur(l.importe)}{' '}
                        <span className="ejemplo">Ejemplo</span>
                      </span>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Envío</th>
                  <td>
                    {pedido.portes === 0 ? 'Incluido' : eur(pedido.portes)}{' '}
                    <span className="ejemplo">Ejemplo</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Total</th>
                  <td>
                    <strong>{eur(pedido.total)}</strong> <span className="ejemplo">Ejemplo</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="hecho__nota">
            En la versión de verdad esto sale del cobro real y llega a su correo, con la etiqueta de
            envío ya preparada. Aquí se queda en la pantalla.
          </p>

          <div className="hecho__botones">
            <Link className="btn btn--tinta" to="/tienda">
              Volver a la tienda
            </Link>
            <Link className="btn btn--ghost" to="/club">
              Ver el club de cosecha
            </Link>
          </div>
        </motion.div>
      </section>
    )
  }

  if (botellas === 0) {
    return (
      <section className="wrap wrap--fino pantalla">
        <Pasos paso={0} />
        <h1>La cesta está vacía</h1>
        <p className="pantalla__bajada">
          Elija sus botellas en la tienda y vuelva. Nada de lo que pase aquí cobra ni envía nada.
        </p>
        <Link className="btn btn--rioja" to="/tienda">
          Ir a la tienda
        </Link>
      </section>
    )
  }

  return (
    <section className="wrap pantalla">
      <Pasos paso={paso} />

      <div className="cesta">
        <div className="cesta__col">
          <AnimatePresence mode="wait">
            {paso === 0 && (
              <motion.div
                key="cesta"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
              >
                <h1>Su cesta</h1>
                <ul className="cesta__lista">
                  {lineas.map(({ vino, n }) => (
                    <li key={vino.slug} className="cesta__linea">
                      <img src={vino.img} alt="" width="60" height="150" loading="lazy" />
                      <div className="cesta__quien">
                        <p className="cesta__nombre">
                          {vino.nombre} {vino.anada}
                        </p>
                        <p className="cesta__sub">
                          {vino.uva} <span aria-hidden="true">·</span> {vino.do}
                        </p>
                        <p className="cesta__unit">
                          {eur(vino.precio)} la botella <span className="ejemplo">Ejemplo</span>
                        </p>
                      </div>
                      <div className="cesta__cant">
                        <div className="cant" role="group" aria-label={`Botellas de ${vino.nombre}`}>
                          <button type="button" onClick={() => fijar(vino.slug, n - 1)} aria-label={`Quitar una botella de ${vino.nombre}`}>
                            <IconoMenos />
                          </button>
                          <input
                            type="number"
                            min="0"
                            max="99"
                            value={n}
                            aria-label={`Botellas de ${vino.nombre}`}
                            data-qty={vino.slug}
                            onChange={(e) => fijar(vino.slug, e.target.value)}
                          />
                          <button type="button" onClick={() => fijar(vino.slug, n + 1)} aria-label={`Añadir una botella de ${vino.nombre}`}>
                            <IconoMas />
                          </button>
                        </div>
                        <button type="button" className="cesta__quitar" onClick={() => quitar(vino.slug)}>
                          Quitar
                        </button>
                      </div>
                      <p className="cesta__importe">
                        {eur(vino.precio * n)} <span className="ejemplo">Ejemplo</span>
                      </p>
                    </li>
                  ))}
                </ul>

                {bajoMinimo && (
                  <p className="aviso aviso--ojo">
                    <span className="ejemplo">Ejemplo</span> El pedido mínimo de esta demostración es
                    de {envio.minimo} botellas. La bodega no publica ninguno, así que esta regla
                    también es inventada.
                  </p>
                )}

                <button
                  type="button"
                  className="btn btn--rioja btn--ancho"
                  disabled={bajoMinimo}
                  onClick={() => setPaso(1)}
                  data-next="envio"
                >
                  Continuar con el envío
                </button>
              </motion.div>
            )}

            {paso === 1 && (
              <motion.form
                key="envio"
                onSubmit={aPago}
                noValidate
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
              >
                <h1>¿A dónde va el vino?</h1>
                <p className="pantalla__bajada">
                  Estos datos no salen de su navegador. No se guardan, no se envían y nadie los
                  recibe.
                </p>

                <div className="campos">
                  <label className="campo campo--ancho">
                    <span>Nombre y apellidos</span>
                    <input name="nombre" autoComplete="off" value={datos.nombre} onChange={cambiar('nombre')} />
                    {fallos.nombre && <em className="campo__fallo">{fallos.nombre}</em>}
                  </label>
                  <label className="campo campo--ancho">
                    <span>Dirección</span>
                    <input name="direccion" autoComplete="off" value={datos.direccion} onChange={cambiar('direccion')} />
                    {fallos.direccion && <em className="campo__fallo">{fallos.direccion}</em>}
                  </label>
                  <label className="campo">
                    <span>Código postal</span>
                    <input name="cp" inputMode="numeric" autoComplete="off" value={datos.cp} onChange={cambiar('cp')} />
                    {fallos.cp && <em className="campo__fallo">{fallos.cp}</em>}
                  </label>
                  <label className="campo">
                    <span>Población</span>
                    <input name="poblacion" autoComplete="off" value={datos.poblacion} onChange={cambiar('poblacion')} />
                    {fallos.poblacion && <em className="campo__fallo">{fallos.poblacion}</em>}
                  </label>
                  <label className="campo">
                    <span>Teléfono</span>
                    <input name="telefono" inputMode="tel" autoComplete="off" value={datos.telefono} onChange={cambiar('telefono')} />
                    {fallos.telefono && <em className="campo__fallo">{fallos.telefono}</em>}
                  </label>
                  <label className="campo">
                    <span>Correo</span>
                    <input name="email" inputMode="email" autoComplete="off" value={datos.email} onChange={cambiar('email')} />
                    {fallos.email && <em className="campo__fallo">{fallos.email}</em>}
                  </label>
                </div>

                <div className="pantalla__botones">
                  <button type="button" className="btn btn--ghost" onClick={() => setPaso(0)}>
                    Volver a la cesta
                  </button>
                  <button type="submit" className="btn btn--rioja" data-next="pago">
                    Continuar al pago
                  </button>
                </div>
              </motion.form>
            )}

            {paso === 2 && (
              <motion.div
                key="pago"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
              >
                <h1>Pago simulado</h1>
                <p className="pantalla__bajada">
                  Aquí no se pide ninguna tarjeta y no se cobra nada. El botón solo pasa a la
                  pantalla siguiente para que vea cómo termina.
                </p>

                <div className="pago">
                  <p className="pago__cabecera">
                    En la versión de verdad, en este punto iría la pasarela de su banco o de Stripe,
                    con el importe ya cerrado.
                  </p>
                  <p className="pago__importe">
                    <span className="pago__cifra">{eur(total)}</span>
                    <span className="ejemplo">Ejemplo</span>
                  </p>
                  <p className="pago__entrega">
                    A nombre de {datos.nombre}, {datos.direccion}, {datos.cp} {datos.poblacion}.
                  </p>
                  <button
                    type="button"
                    className="btn btn--rioja btn--ancho"
                    onClick={simularPago}
                    disabled={cobrando}
                    data-next="confirmar"
                  >
                    {cobrando ? 'Un momento' : 'Simular el pago'}
                  </button>
                  <p className="pago__pie">Nada de esto llega a ningún banco.</p>
                </div>

                <div className="pantalla__botones">
                  <button type="button" className="btn btn--ghost" onClick={() => setPaso(1)}>
                    Volver al envío
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="cesta__aside">
          <Resumen lineas={lineas} subtotal={subtotal} portes={portes} total={total} botellas={botellas} />
        </aside>
      </div>
    </section>
  )
}

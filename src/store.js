import { create } from 'zustand'
import { vinos, envio } from './data/vinos.js'

const buscar = (slug) => vinos.find((v) => v.slug === slug)

export const useCarrito = create((set, get) => ({
  lineas: {}, // slug -> unidades

  anadir: (slug, n = 1) =>
    set((s) => {
      const actual = s.lineas[slug] || 0
      const nuevo = Math.min(99, actual + n)
      return { lineas: { ...s.lineas, [slug]: nuevo } }
    }),

  fijar: (slug, n) =>
    set((s) => {
      const lineas = { ...s.lineas }
      const v = Math.max(0, Math.min(99, Number(n) || 0))
      if (v === 0) delete lineas[slug]
      else lineas[slug] = v
      return { lineas }
    }),

  quitar: (slug) =>
    set((s) => {
      const lineas = { ...s.lineas }
      delete lineas[slug]
      return { lineas }
    }),

  vaciar: () => set({ lineas: {} }),

  articulos: () => {
    const { lineas } = get()
    return Object.entries(lineas)
      .map(([slug, n]) => ({ vino: buscar(slug), n }))
      .filter((l) => l.vino)
  },

  botellas: () => Object.values(get().lineas).reduce((a, b) => a + b, 0),

  subtotal: () => get().articulos().reduce((a, l) => a + l.vino.precio * l.n, 0),

  portes: () => {
    const b = get().botellas()
    if (b === 0) return 0
    return b >= envio.gratisDesde ? 0 : envio.peninsula
  },

  total: () => get().subtotal() + get().portes(),
}))

export const useClub = create((set, get) => ({
  reservas: {}, // slug -> botellas de la proxima anada

  fijar: (slug, n) =>
    set((s) => {
      const reservas = { ...s.reservas }
      const v = Math.max(0, Math.min(12, Number(n) || 0))
      if (v === 0) delete reservas[slug]
      else reservas[slug] = v
      return { reservas }
    }),

  vaciar: () => set({ reservas: {} }),

  botellas: () => Object.values(get().reservas).reduce((a, b) => a + b, 0),

  lineas: () =>
    Object.entries(get().reservas)
      .map(([slug, n]) => ({ vino: buscar(slug), n }))
      .filter((l) => l.vino),
}))

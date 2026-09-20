// Iconos en svg, para no meter ningun caracter de guion en el texto de la pagina.
export function IconoMenos() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
      <rect x="2.5" y="7.1" width="11" height="1.8" rx="0.9" fill="currentColor" />
    </svg>
  )
}

export function IconoMas() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
      <rect x="2.5" y="7.1" width="11" height="1.8" rx="0.9" fill="currentColor" />
      <rect x="7.1" y="2.5" width="1.8" height="11" rx="0.9" fill="currentColor" />
    </svg>
  )
}

export function IconoVisto() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path
        d="M4 12.6l5.2 5.2L20 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

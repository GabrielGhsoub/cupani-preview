import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Una sola fuente, dos compilaciones. La de PREVIEW vive en GitHub Pages bajo
// un subdirectorio, lleva el lazo de demostracion y va en noindex para que no
// compita nunca con cupani.es en Google. La de produccion iria en la raiz de su
// propio alojamiento.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const preview = env.VITE_PREVIEW === '1'
  return {
    plugins: [
      react(),
      {
        name: 'preview-noindex',
        transformIndexHtml(html) {
          if (!preview) return html
          return html
            .replace(
              '</head>',
              '    <meta name="robots" content="noindex,nofollow,noarchive,nosnippet" />\n  </head>',
            )
            .replace('<body>', '<body data-preview="1">')
        },
      },
    ],
    base: env.VITE_BASE || '/',
    build: { outDir: env.VITE_OUTDIR || 'dist', assetsInlineLimit: 0 },
  }
})

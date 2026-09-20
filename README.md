# cupani-preview

Demostración privada de tienda online y club de cosecha para **Bodega Heredad
San Andrés, S.L.** (Cupani), San Vicente de la Sonsierra, La Rioja.

Nada de lo que se hace en esta página compra, cobra ni envía nada. No hay
pasarela de pago, no se piden tarjetas, no sale ningún correo.

La procedencia de cada dato y cada imagen está en [`CREDITS.md`](CREDITS.md).
Los precios son inventados y van marcados EJEMPLO en pantalla, porque la bodega
no publica ninguno.

## Cómo se construye

```bash
npm install
npm run build        # compilación de vista previa: lazo, noindex, base /cupani-preview/
npm run build:prod   # compilación para su propio alojamiento, en dist-prod, sin lazo
```

Hecho por Likwiid.

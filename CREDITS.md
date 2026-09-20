# Procedencia de todo lo que se ve en esta demostración

Fecha de lectura de la fuente: **20 de septiembre de 2026**.

## Imágenes

| Fichero | Origen | Nota |
|---|---|---|
| `public/img/vinedo.jpg` | fotograma del vídeo de portada de cupani.es (`/wp-content/themes/betheme-child/videos/gente.mp4`) | material propio de la bodega, redimensionado a 1600 px, q80, sin datos EXIF |
| `public/img/cepas.jpg` | recorte del mismo fotograma | igual |
| `public/img/rielo.webp` | `https://cupani.es/wp-content/uploads/2023/09/rielo-1.png` | botella publicada por la bodega |
| `public/img/cupani.webp` | `https://cupani.es/wp-content/uploads/2023/09/CUPANI.png` | botella publicada por la bodega |
| `public/img/garnacha.webp` | `https://cupani.es/wp-content/uploads/2023/09/cupani_garnacha.png` | botella publicada por la bodega |
| `public/img/baskunes.webp` | `https://cupani.es/wp-content/uploads/2023/09/baskunes-2.png` | botella publicada por la bodega |
| `public/img/sir.webp` | `https://cupani.es/wp-content/uploads/2023/09/sir_cupani.png` | botella publicada por la bodega |
| `public/img/logotipo.webp` | `https://cupani.es/wp-content/themes/betheme-child/images/cupani.png` | su logotipo, sin retocar |

Ninguna imagen de banco. Ninguna imagen de terceros.

## Datos de los vinos

Cada campo de `src/data/vinos.js` sale de la ficha técnica en pdf de ese vino,
enlazada desde `https://cupani.es/vinos`:

- `RIELO_2021.pdf`, `CUPANI_2022.pdf`, `CUPANI_GARNACHA_2024.pdf`, `BASKUNES_2022.pdf`, `SIR_CUPANI_2023.pdf`

La mención **DOCa Rioja** sale de la contraetiqueta fotografiada en cada una de
esas cinco fichas, donde se lee "RIOJA / DENOMINACIÓN DE ORIGEN CALIFICADA".
No aparece en el texto de las fichas.

Las **notas de cata** solo figuran en la cara inglesa de cada ficha. Van
traducidas al castellano, sin añadir nada.

### Dos grados alcohólicos que no coinciden en su propia ficha

| Vino | Cara española | Cara inglesa | Lo que muestra la demostración |
|---|---|---|---|
| Cupani 2022 | 13,5º | 14º | 13,5º |
| Sir Cupani 2023 | 14,5º | 15º | 14,5º |

Hay que preguntárselo a la bodega.

### Una discrepancia más, por si sirve

La cara española de `RIELO_2021.pdf` dice "Manual en cajas de 12 kilos" y la
inglesa dice "Hand-picked in a 2.000 kg stainless-steel bathtub". Por eso la
demostración solo dice "vendimia manual", que es cierto en las dos.

La foto de la botella de Cupani muestra una contraetiqueta de otra añada
(8.098 botellas). La tarjeta usa la cifra de la ficha 2022: 4.874 botellas y
100 magnums.

## INVENTADO: nada de esto lo publica la bodega

Va todo marcado con la etiqueta EJEMPLO en pantalla.

| Concepto | Valor de la demostración |
|---|---|
| Rielo 2021 | 18,00 EUR la botella |
| Cupani 2022 | 24,00 EUR la botella |
| Cupani Garnacha 2024 | 32,00 EUR la botella |
| Baskunes 2022 | 28,00 EUR la botella |
| Sir Cupani 2023 | 45,00 EUR la botella |
| Envío a península | 6,90 EUR por pedido |
| Envío gratis | a partir de 6 botellas |
| Pedido mínimo | 3 botellas |
| Tope del club | 12 botellas por vino |

## Identidad del pie

Bodega Heredad San Andrés, S.L., Travesía la Concepción 28, 26338 San Vicente
de la Sonsierra (La Rioja), info@cupani.es. Tomado del pie de cupani.es y de
las cinco fichas.

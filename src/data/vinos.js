// Cada dato de este fichero sale de la ficha tecnica en pdf de ese mismo vino,
// publicada por la bodega en cupani.es/vinos, mas la contraetiqueta que aparece
// fotografiada en esa misma ficha (de ahi la DOCa Rioja).
//
// Los grados alcoholicos son los de la cara ESPANOLA de cada ficha. En Cupani
// 2022 y en Sir Cupani 2023 la cara inglesa da otro grado (14 y 15). Queda
// senalado para que la bodega diga cual vale.
//
// Las notas de cata solo figuran en la cara inglesa de las fichas. Estan
// traducidas, nada anadido.
//
// LOS PRECIOS SON EJEMPLO. La bodega no publica ninguno.

const BASE = import.meta.env.BASE_URL

export const vinos = [
  {
    slug: 'rielo',
    nombre: 'Rielo',
    anada: '2021',
    tipo: 'Blanco',
    do: 'DOCa Rioja',
    uva: 'Viura 100%',
    plantacion: '1959',
    altitud: '525 metros',
    alcohol: '13,5º',
    produccion: '1.628 botellas',
    finca: 'Finca San Andrés',
    nota1: 'Finca San Andrés, arcillo calcáreo con mucho canto rodado y bastante mineral, en fuerte ladera y con un marco de plantación muy raro.',
    nota2: 'Fermenta una parte en barrica de roble francés de 500 litros, otra en acero inoxidable y otra en flextank Egg, y envejece 7 meses sobre sus lías finas con batonnage.',
    cata: 'Color limpio y brillante, casi transparente. En nariz, flor de tilo, notas de madera y pomelo. Fragante y sabroso, en boca es redondo y equilibrado, con un posgusto agradable.',
    ficha: 'https://cupani.es/wp-content/uploads/2026/01/RIELO_2021.pdf',
    img: BASE + 'img/rielo.webp',
    acento: '#c8a57b',
    precio: 18,
  },
  {
    slug: 'cupani',
    nombre: 'Cupani',
    anada: '2022',
    tipo: 'Tinto',
    do: 'DOCa Rioja',
    uva: 'Tempranillo 100%',
    plantacion: '1982',
    altitud: '537 metros',
    alcohol: '13,5º',
    produccion: '4.874 botellas y 100 magnums',
    finca: 'Finca San Andrés',
    nota1: 'Finca San Andrés, arcillo calcáreo con bastante canto rodado y bastante mineral, abrigada por los montes para que tenga pocas heladas.',
    nota2: 'Fermentación en depósito de acero inoxidable y maloláctica en roble francés, 70% nuevo y 30% usado, en 225, 300 y 500 litros, durante 12 meses.',
    cata: 'Afrutado, armónico y elegante. Arándanos y un fondo de tabaco en nariz. Una madera sutil que lleva a la fruta negra y a notas delicadas de cuero, con taninos suaves.',
    ficha: 'https://cupani.es/wp-content/uploads/2026/01/CUPANI_2022.pdf',
    img: BASE + 'img/cupani.webp',
    acento: '#aa474b',
    precio: 24,
  },
  {
    slug: 'garnacha',
    nombre: 'Cupani Garnacha',
    anada: '2024',
    tipo: 'Tinto',
    do: 'DOCa Rioja',
    uva: 'Garnacha 100%',
    plantacion: '1917',
    altitud: '542 metros',
    alcohol: '14,5º',
    produccion: '619 botellas',
    finca: 'Finca San Prudencio',
    nota1: 'Finca San Prudencio, arcillo ferroso de poco suelo y mucha lastra de arenisca. Las cepas, plantadas en 1917, han cogido mucha altura y tienen ya los brazos débiles.',
    nota2: 'Despalillado y fermentación en acero inoxidable, maloláctica en inox y después crianza en madera usada y nueva de roble francés durante 9 meses.',
    cata: 'Fruta roja intensa y vibrante, frambuesa y grosella, con una acidez viva y cítrica. Y por encima de todo, una nariz floral espectacular.',
    ficha: 'https://cupani.es/wp-content/uploads/2026/01/CUPANI_GARNACHA_2024.pdf',
    img: BASE + 'img/garnacha.webp',
    acento: '#8a7fa1',
    precio: 32,
  },
  {
    slug: 'baskunes',
    nombre: 'Baskunes',
    anada: '2022',
    tipo: 'Tinto',
    do: 'DOCa Rioja',
    uva: 'Tempranillo 100%',
    plantacion: '1945, 1954 y 1965',
    altitud: '580 metros',
    alcohol: '14,5º',
    produccion: '1.620 botellas',
    finca: 'Finca Mojón de Labastida',
    nota1: 'Finca Mojón de Labastida, arcillo ferroso de poco suelo y mucha lastra de arenisca, abrigada del norte por una cordillera de piedras e higueras.',
    nota2: 'Despalillado y fermentación en acero inoxidable. Maloláctica en madera, en barricas de 300 litros usadas y de 225 litros nuevas de roble francés, durante 12 meses.',
    cata: 'Cerezas, granos de café y especias con notas tostadas. Un vino opulento, con cuerpo y bien estructurado, de paso sedoso y final largo. Hecho para guardar.',
    ficha: 'https://cupani.es/wp-content/uploads/2026/01/BASKUNES_2022.pdf',
    img: BASE + 'img/baskunes.webp',
    acento: '#aa474b',
    precio: 28,
  },
  {
    slug: 'sir-cupani',
    nombre: 'Sir Cupani',
    anada: '2023',
    tipo: 'Tinto',
    do: 'DOCa Rioja',
    uva: 'Tempranillo 100%',
    plantacion: '1982',
    altitud: '537 metros',
    alcohol: '14,5º',
    produccion: '1.006 botellas',
    finca: 'Finca San Andrés',
    nota1: 'De la Finca San Andrés, Enrique Eguiluz selecciona y vendimia él solo los racimos: únicamente los mejores de las mejores cepas, la uva del medio día, por ser la primera en madurar.',
    nota2: 'Desgranado a mano, grano a grano, maceración de 5 días, fermentación de 14 días en acero inoxidable y 12 meses de crianza sobre lías finas con batonnage, en roble francés.',
    cata: 'Tiramisú, café, nata y cacao. Potente, de boca redonda y bien estructurada, con un final muy largo. Un vino que acompañará una colección durante muchos años.',
    ficha: 'https://cupani.es/wp-content/uploads/2026/01/SIR_CUPANI_2023.pdf',
    img: BASE + 'img/sir.webp',
    acento: '#b29b92',
    precio: 45,
  },
]

// Todo lo de aqui abajo es EJEMPLO. Se cambia en un minuto.
export const envio = {
  peninsula: 6.9,
  gratisDesde: 6,
  minimo: 3,
}

export const bodega = {
  nombre: 'Bodega Heredad San Andrés, S.L.',
  marca: 'Cupani',
  calle: 'Travesía la Concepción 28',
  cp: '26338',
  municipio: 'San Vicente de la Sonsierra',
  provincia: 'La Rioja',
  email: 'info@cupani.es',
  sitio: 'https://cupani.es',
  visitas: 'https://cupani.es/visitas',
  vinos: 'https://cupani.es/vinos',
}

export const eur = (n) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)

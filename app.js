/* =========================================
   CHROMA SPLAT · 20 DISEÑOS POR SECCIÓN (100 DISEÑOS TOTAL)
   ILUSTRACIÓN FIEL AL TÍTULO Y CATEGORÍA DE CADA DISEÑO
   ========================================= */

const WHATSAPP_NUMBER = "59162072154";

const SECTOR_LABELS = {
  "sublimacion-dtf": "Sublimación & DTF",
  "diseno-vinil": "Diseño en Vinil",
  "vectores": "Diseños Vectores",
  "3d": "3D",
  "abstracto": "Abstracto"
};

function seededRand(seed) {
  let s = (Math.abs(seed) * 9301 + 49297) % 233280;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function drawArtworkOnCanvas(canvas, item) {
  if (!canvas || !item) return;
  const w = 800;
  const h = 500;
  if (canvas.width !== w) canvas.width = w;
  if (canvas.height !== h) canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const sectorKey = item.category || 'abstracto';
  const title = String(item.title || '');
  const low = title.toLowerCase();
  const index = typeof item.artIndex === 'number' ? item.artIndex : 0;
  const pal = item.palette && item.palette.length >= 4 ? item.palette : ['#ff2a85', '#18e0ff', '#ffc82c', '#7c3aed'];

  // Semilla única por diseño (combina índice global + caracteres del título) para que NO se repitan
  let seed = (index + 1) * 7919;
  for (let i = 0; i < title.length; i++) {
    seed = (seed * 131 + title.charCodeAt(i) * (i + 7)) % 2147483647;
  }
  const rand = seededRand(seed);
  const c1 = pal[seed % pal.length];
  const c2 = pal[(seed + 1) % pal.length];
  const c3 = pal[(seed + 2) % pal.length];
  const c4 = pal[(seed + 3) % pal.length];

  ctx.save();

  // Fondo base según categoría
  if (sectorKey === 'sublimacion-dtf') {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#120824');
    g.addColorStop(0.55, '#1d0d38');
    g.addColorStop(1, '#081629');
    ctx.fillStyle = g;
  } else if (sectorKey === 'diseno-vinil') {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#09101d');
    g.addColorStop(1, '#141026');
    ctx.fillStyle = g;
  } else if (sectorKey === 'vectores') {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#0d1326');
    g.addColorStop(1, '#191030');
    ctx.fillStyle = g;
  } else if (sectorKey === '3d') {
    const g = ctx.createRadialGradient(400, 210, 30, 400, 230, 500);
    g.addColorStop(0, '#240f42');
    g.addColorStop(0.65, '#0b0719');
    g.addColorStop(1, '#04020a');
    ctx.fillStyle = g;
  } else {
    const g = ctx.createLinearGradient(0, h, w, 0);
    g.addColorStop(0, '#160826');
    g.addColorStop(0.5, '#0e152e');
    g.addColorStop(1, '#240c24');
    ctx.fillStyle = g;
  }
  ctx.fillRect(0, 0, w, h);

  // Motivos específicos según palabras del título (cada diseño tiene una escena distinta)
  if (low.includes('nebulosa') || low.includes('cósmic') || low.includes('aurora') || low.includes('galaxia') || low.includes('supernova')) {
    for (let n = 0; n < 5; n++) {
      const nx = 140 + rand() * 520;
      const ny = 80 + rand() * 240;
      const nr = 75 + rand() * 115;
      const rg = ctx.createRadialGradient(nx, ny, 8, nx, ny, nr);
      rg.addColorStop(0, pal[n % pal.length]);
      rg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(nx, ny, nr, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 0.95;
    ctx.fillStyle = '#ffffff';
    for (let st = 0; st < 38; st++) {
      ctx.beginPath();
      ctx.arc(40 + rand() * 720, 30 + rand() * 360, 1 + rand() * 2.8, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (low.includes('destello') || low.includes('solar') || low.includes('sol') || low.includes('resplandor') || low.includes('chispa')) {
    const sx = 240 + rand() * 320;
    const sy = 120 + rand() * 170;
    const rays = 16 + (seed % 12);
    for (let r = 0; r < rays; r++) {
      const ang = (Math.PI * 2 * r) / rays + rand() * 0.15;
      const len = 95 + rand() * 165;
      ctx.strokeStyle = pal[r % pal.length];
      ctx.lineWidth = 2.5 + rand() * 5;
      ctx.beginPath();
      ctx.moveTo(sx + Math.cos(ang) * 28, sy + Math.sin(ang) * 28);
      ctx.lineTo(sx + Math.cos(ang) * len, sy + Math.sin(ang) * len);
      ctx.stroke();
    }
    ctx.fillStyle = '#ffc82c';
    ctx.beginPath();
    ctx.arc(sx, sy, 42 + (seed % 22), 0, Math.PI * 2);
    ctx.fill();
  } else if (low.includes('pulso') || low.includes('eléctric') || low.includes('rayo') || low.includes('impacto') || low.includes('energía')) {
    for (let b = 0; b < 4; b++) {
      ctx.strokeStyle = pal[b % pal.length];
      ctx.lineWidth = 3.5 - b * 0.5;
      ctx.beginPath();
      let px = 50;
      let py = 95 + b * 68;
      ctx.moveTo(px, py);
      while (px < w - 50) {
        px += 35 + rand() * 45;
        py += (rand() - 0.5) * 95;
        ctx.lineTo(px, Math.max(30, Math.min(h - 90, py)));
      }
      ctx.stroke();
    }
  } else if (low.includes('marea') || low.includes('ola') || low.includes('onda') || low.includes('cascada') || low.includes('flujo') || low.includes('líquid')) {
    const waves = 6 + (seed % 4);
    for (let k = 0; k < waves; k++) {
      const baseY = 75 + k * 46;
      ctx.fillStyle = pal[k % pal.length];
      ctx.globalAlpha = 0.72;
      ctx.beginPath();
      ctx.moveTo(0, h - 70);
      ctx.lineTo(0, baseY);
      for (let x = 0; x <= w; x += 40) {
        const y = baseY + Math.sin(x * 0.012 + k * 1.1 + seed) * (18 + (k % 3) * 10);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h - 70);
      ctx.closePath();
      ctx.fill();
    }
  } else if (low.includes('franja') || low.includes('racing') || low.includes('línea') || low.includes('velocidad') || low.includes('lateral')) {
    const stripes = 5 + (seed % 4);
    const skew = 70 + (seed % 60);
    for (let s = 0; s < stripes; s++) {
      const y0 = 65 + s * 52;
      ctx.fillStyle = pal[s % pal.length];
      ctx.beginPath();
      ctx.moveTo(40 + s * 14, y0 + 34);
      ctx.lineTo(40 + s * 14 + skew, y0);
      ctx.lineTo(w - 50 - s * 10, y0);
      ctx.lineTo(w - 50 - s * 10 - skew, y0 + 34);
      ctx.closePath();
      ctx.fill();
    }
  } else if (low.includes('geométr') || low.includes('isométr') || low.includes('poliedro') || low.includes('módulo') || low.includes('modular') || low.includes('retícula')) {
    const cols = 5;
    const rows = 3;
    const cellW = (w - 140) / cols;
    const cellH = (h - 150) / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = 70 + c * cellW + cellW * 0.5;
        const cy = 40 + r * cellH + cellH * 0.5;
        const rad = Math.min(cellW, cellH) * (0.28 + rand() * 0.16);
        const sides = 3 + ((r + c + seed) % 5);
        ctx.fillStyle = pal[(r * cols + c + seed) % pal.length];
        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let v = 0; v < sides; v++) {
          const ang = (Math.PI * 2 * v) / sides + rand() * 0.4;
          const vx = cx + Math.cos(ang) * rad;
          const vy = cy + Math.sin(ang) * rad;
          if (v === 0) ctx.moveTo(vx, vy);
          else ctx.lineTo(vx, vy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }
  } else if (low.includes('esfera') || low.includes('anillo') || low.includes('toroide') || low.includes('cápsula') || low.includes('núcleo') || low.includes('cristal')) {
    const count = 2 + (seed % 3);
    for (let i = 0; i < count; i++) {
      const cx = 200 + i * 200 + (rand() - 0.5) * 50;
      const cy = 155 + (rand() - 0.5) * 70;
      const r = 52 + rand() * 34;
      const grad = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.08, cx, cy, r);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, pal[i % pal.length]);
      grad.addColorStop(0.85, pal[(i + 2) % pal.length]);
      grad.addColorStop(1, '#060312');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = c2;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * 1.45, r * 0.36, -0.35 + i * 0.4, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else {
    // Escena variada y única para el resto de títulos usando su semilla propia
    const mode = seed % 4;
    if (mode === 0) {
      // Barras diagonales de color con variación por semilla
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = pal[(i + seed) % pal.length];
        ctx.globalAlpha = 0.82;
        const x0 = 70 + i * 115 + (rand() - 0.5) * 30;
        ctx.beginPath();
        ctx.moveTo(x0, 360);
        ctx.lineTo(x0 + 65, 65);
        ctx.lineTo(x0 + 115, 65);
        ctx.lineTo(x0 + 50, 360);
        ctx.closePath();
        ctx.fill();
      }
    } else if (mode === 1) {
      // Círculos concéntricos y arcos en posiciones únicas
      for (let i = 0; i < 4; i++) {
        const cx = 140 + i * 170;
        const cy = 110 + ((i * 57 + seed) % 160);
        for (let ring = 1; ring <= 3; ring++) {
          ctx.strokeStyle = pal[(i + ring) % pal.length];
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(cx, cy, ring * 22, (seed % 6) * 0.5, Math.PI * 1.65);
          ctx.stroke();
        }
      }
    } else if (mode === 2) {
      // Salpicaduras y gotas dispersas únicas por diseño
      for (let i = 0; i < 18; i++) {
        const gx = 75 + rand() * 650;
        const gy = 55 + rand() * 310;
        const gr = 10 + rand() * 36;
        ctx.fillStyle = pal[i % pal.length];
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(gx, gy, gr, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Trazos curvos cruzados con variación de ángulo y color
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = pal[(i + seed) % pal.length];
        ctx.lineWidth = 10 + (i % 3) * 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(50, 70 + i * 62);
        ctx.bezierCurveTo(
          220 + rand() * 120,
          30 + rand() * 260,
          460 + rand() * 120,
          30 + rand() * 260,
          750,
          90 + ((i * 53 + seed) % 240)
        );
        ctx.stroke();
      }
    }
  }

  ctx.restore();

  // Pie de lámina con el título exacto del diseño
  ctx.fillStyle = 'rgba(6, 5, 13, 0.88)';
  ctx.fillRect(18, h - 66, w - 36, 46);
  ctx.fillStyle = c3;
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText(`${(SECTOR_LABELS[sectorKey] || sectorKey).toUpperCase()} · #${String(index + 1).padStart(2, '0')}`, 32, h - 38);
  ctx.fillStyle = '#f8fafc';
  ctx.font = '600 14px sans-serif';
  ctx.fillText(title.slice(0, 52), 275, h - 38);
}

const SECTOR_BLUEPRINTS = [
  {
    key: "sublimacion-dtf",
    prefix: "sub",
    baseBs: 165,
    stepBs: 12,
    formats: "PNG Transparente 300 DPI, TIFF, PSD",
    res: "4500×6000 px · 300 DPI",
    license: "Poliéster, Algodón y DTF",
    application: "Poleras deportivas, hoodies, tazas y estampado textil full print",
    finish: "Transferencia térmica 190°C / Impresión DTF con base blanca",
    colorMode: "RGB Perfil Alto Contraste",
    titles: [
      "Fusión Cromática Poliéster DTF",
      "Chorro Neón Sublimación Full",
      "Choque de Tintas Camiseta Urbana",
      "Onda Líquida Fluorescente DTF",
      "Ráfaga Acuarela Deportiva Pro",
      "Nebulosa Magenta & Cian Textil",
      "Destello Solar Sublimación Panorámica",
      "Pulso Eléctrico DTF Prenda Oscura",
      "Marea Tropical Poliéster Alta Definición",
      "Estallido Urbano Arte DTF",
      "Tormenta de Color Jersey Sublimado",
      "Prisma Líquido Estampado Frontal",
      "Fusión Ácida DTF Alta Cobertura",
      "Salpicadura Coral & Turquesa Textil",
      "Cascada Cromática Hoodie Full Print",
      "Impacto Neón Mangas & Espalda",
      "Bruma Violeta Sublimación Tazas & Tela",
      "Chispas de Tinta DTF Sin Bordes",
      "Espectro Dinámico Ropa Deportiva",
      "Supernova de Color Sublimación HD"
    ],
    descTemplate: (title) => `Diseño de estampado "${title}" (sección Sublimación & DTF) con trazos y manchas pensadas para sublimación en poliéster y DTF en algodón.`
  },
  {
    key: "diseno-vinil",
    prefix: "vin",
    baseBs: 145,
    stepBs: 11,
    formats: "AI, EPS, SVG, DXF",
    res: "Escala Real · Trazos Cerrados",
    license: "Plotter de Corte & Vinil",
    application: "Rotulación vehicular, vidrieras comerciales, vinil textil y señalética",
    finish: "Nodos de corte limpios con marcas de registro para plotter",
    colorMode: "Colores Planos / Vinil Cast & PU",
    titles: [
      "Rotulación Vinil Corte Automotriz",
      "Emblema Vinil Textil Termoadhesivo",
      "Franjas Racing Plotter Vehicular",
      "Silueta Geométrica Escaparate Comercial",
      "Tipografía Troquelada Vinil Adhesivo",
      "Gráfico Lateral Camioneta & Flota",
      "Parche Vinil Textil PU Alto Contraste",
      "Señalética Moderna Corte Limpio",
      "Líneas Aerodinámicas Vinil Mate",
      "Monograma Troquelado Gorras & Polos",
      "Decoración Mural Vinil Arquitectónico",
      "Sticker Troquelado Edición Estudio",
      "Contorno Deportivo Vinil Reflectivo",
      "Patrón Modular Vidriera & Oficina",
      "Insignia Dorsal Vinil Textil Pro",
      "Trazo Dinámico Plotter Alta Precisión",
      "Etiqueta Industrial Corte Contorno",
      "Blasón Urbano Vinil Dos Capas",
      "Ondas de Velocidad Vinil Automotor",
      "Sello Minimalista Corte Térmico"
    ],
    descTemplate: (title) => `Gráfico para plotter "${title}" (sección Diseño en Vinil) con geometría de corte definida y marcas de registro.`
  },
  {
    key: "vectores",
    prefix: "vec",
    baseBs: 185,
    stepBs: 13,
    formats: "AI, EPS, SVG, PDF",
    res: "Vector 100% Escalar",
    license: "Editorial, Web & Merch",
    application: "Identidad visual, pósters, empaques, gigantografías e impresión offset",
    finish: "Tramas halftone, polígonos y estrellas vectoriales escalables",
    colorMode: "CMYK + RGB Editables",
    titles: [
      "Vector Fluido Tinta & Semitono",
      "Pack Ráfagas & Gotas Vectoriales",
      "Ilustración Geométrica Isométrica",
      "Composición Tipográfica Vector Pro",
      "Malla Degradada Vectorial Fluida",
      "Set Emblemas & Escudos Editables",
      "Trazo Caligráfico Vectorizado HD",
      "Patrón Seamless Editorial & Packaging",
      "Mascota Ilustrada Capas Separadas",
      "Ondas Vectoriales de Alta Precisión",
      "Colección Destellos & Estrellas SVG",
      "Infografía Modular Vector Limpio",
      "Arte Lineal Contorno Continuo",
      "Poster Suizo Retícula Vectorial",
      "Explosión Pop Art Halftone Vector",
      "Texturas Grunge Vectorizadas 100%",
      "Símbolos Futuristas Kit de Marca",
      "Paisaje Sintético Capas Vectoriales",
      "Ornamentos Modernos Corte & Print",
      "Sistema Visual Modular Escalable"
    ],
    descTemplate: (title) => `Ilustración vectorial "${title}" (sección Diseños Vectores) con semitonos y formas geométricas escalables.`
  },
  {
    key: "3d",
    prefix: "3d",
    baseBs: 245,
    stepBs: 16,
    formats: "PNG Alpha 4K, BLEND, OBJ, FBX",
    res: "4096×4096 px · 300 DPI",
    license: "Render 3D & Gráfico",
    application: "Portadas musicales, campañas digitales, key visuals y arte de impacto",
    finish: "Volumen esférico, luz especular y anillos orbitales",
    colorMode: "32-Bit HDR / sRGB",
    titles: [
      "Escultura 3D Fluido Cromático",
      "Cristal Cromado 3D en Detonación",
      "Esfera Iridescente Fluido 3D",
      "Núcleo Volumétrico Neón & Vidrio",
      "Fragmentos Metálicos Gravedad Cero",
      "Onda Escultórica 3D Holográfica",
      "Toroide Líquido Refracción Prisma",
      "Monolito Abstracto Luz Volumétrica",
      "Gotas Cromadas en Suspensión 3D",
      "Arquitectura Surrealista Render 4K",
      "Cinta Infinita Shader Iridescente",
      "Impacto Volumétrico Simulación 3D",
      "Poliedro Cristalino Luz de Borde",
      "Vórtice Cinético Render Studio",
      "Fluido Magnético Alta Resolución",
      "Anillos Orbitales Cromo & Neón",
      "Relieve Topográfico 3D Metálico",
      "Cápsula Translúcida Energía Pura",
      "Estructura Geométrica Raytracing",
      "Escena Surrealista Estudio 3D"
    ],
    descTemplate: (title) => `Composición tridimensional "${title}" (sección 3D) con iluminación especular y profundidad volumétrica.`
  },
  {
    key: "abstracto",
    prefix: "abs",
    baseBs: 215,
    stepBs: 14,
    formats: "PSD Capas, PNG 4K, JPG",
    res: "5000×3500 px · 300 DPI",
    license: "Arte Abstracto & Print",
    application: "Cuadros decorativos, portadas, wallpapers HD y fondos escénicos",
    finish: "Curvas orgánicas fluidas y capas de color entrelazadas",
    colorMode: "RGB / CMYK Listo",
    titles: [
      "Abstracto Estallido de Pigmentos",
      "Ondas Abstractas & Chispas de Color",
      "Torbellino Acrílico Alta Energía",
      "Horizonte Cromático Obra Fluida",
      "Colisión de Óleos & Neón",
      "Sinestesia Visual Movimiento Puro",
      "Erupción Pastel & Magenta Intenso",
      "Corrientes de Tinta Profunda",
      "Resplandor Etéreo Arte Contemporáneo",
      "Fragmentos de Luz & Sombra",
      "Galaxia Pictórica Textura Orgánica",
      "Impulso Dinámico Lienzo Fluido",
      "Equilibrio Caótico Dorado & Cian",
      "Mármol Líquido Contraste Dramático",
      "Vibración Cromática Lienzo Digital",
      "Destello Cósmico Acuarela & Acrílico",
      "Flujo Nocturno Pigmentos Luminosos",
      "Geometría Emocional & Trazo Libre",
      "Aurora Abstracta Alta Definición",
      "Expansión Sensorial Obra Maestra"
    ],
    descTemplate: (title) => `Obra abstracta "${title}" (sección Abstracto) con curvas fluidas y contraste de color.`
  }
];

const DESIGNERS = ["Chroma Print Lab", "Alex Studio", "Vortex Sign Lab", "Studio Kroma", "Pulse 3D Studio"];
const DIVISIONS_CYCLE = [
  { id: "div1", label: "División 01 · Filtros & Validación" },
  { id: "div2", label: "División 02 · Efectos Visuales, Zoom & PWA" },
  { id: "div3", label: "División 03 · Responsive & Sim DB" }
];
const PALETTES_CYCLE = [
  ["#ff2a85", "#18e0ff", "#ffc82c", "#7c3aed"],
  ["#18e0ff", "#ff2a85", "#f8fafc", "#110d24"],
  ["#ffc82c", "#ff2a85", "#0f172a", "#38bdf8"],
  ["#7c3aed", "#ff2a85", "#ffc82c", "#18e0ff"],
  ["#10b981", "#18e0ff", "#ff2a85", "#ffc82c"]
];

function buildHundredDesigns() {
  const list = [];
  SECTOR_BLUEPRINTS.forEach((bp, sIdx) => {
    for (let i = 0; i < 20; i++) {
      const title = bp.titles[i];
      const divObj = DIVISIONS_CYCLE[(i + sIdx) % DIVISIONS_CYCLE.length];
      const designer = DESIGNERS[(i + sIdx) % DESIGNERS.length];
      const palette = PALETTES_CYCLE[(i + sIdx) % PALETTES_CYCLE.length];
      const priceBs = Number((bp.baseBs + i * bp.stepBs + sIdx * 9).toFixed(2));
      const layersCount = 28 + ((i * 7 + sIdx * 5) % 92);
      const sizeMb = 35 + ((i * 21 + sIdx * 14) % 360);
      const stock = 25 + ((i * 4 + sIdx * 6) % 70);

      list.push({
        id: `${bp.prefix}-${String(i + 1).padStart(2, '0')}`,
        artIndex: i,
        title,
        designer,
        division: divObj.id,
        divisionLabel: divObj.label,
        category: bp.key,
        priceBs,
        res: bp.res,
        formats: bp.formats,
        layers: `${layersCount} capas/trazos · ${sizeMb} MB`,
        license: bp.license,
        application: bp.application,
        finish: bp.finish,
        colorMode: bp.colorMode,
        stock,
        palette,
        desc: bp.descTemplate(title)
      });
    }
  });
  return list;
}

function formatBs(val) {
  return `Bs. ${Number(val || 0).toFixed(2)}`;
}

const SEED_CATALOG = buildHundredDesigns();

const DIVISIONS_DATA = [
  {
    id: "div1",
    code: "DIVISIÓN 01",
    title: "Filtros por Sección, Búsqueda y Validación",
    status: "Conectada",
    progress: "100%",
    desc: "Filtra los 100 diseños (20 por sección) y valida el formulario de cotización.",
    actionLabel: "Filtrar Sublimación & DTF (20)"
  },
  {
    id: "div2",
    code: "DIVISIÓN 02",
    title: "Efectos Visuales, Zoom HD, Guardados y PWA",
    status: "Conectada",
    progress: "100%",
    desc: "Controla la animación de pintura lanzada, el visor con zoom interactivo, los guardados y el caché offline.",
    actionLabel: "Activar Efecto & Probar Zoom"
  },
  {
    id: "div3",
    code: "DIVISIÓN 03",
    title: "Responsive Multi-Dispositivo & Sim DB",
    status: "Conectada",
    progress: "100%",
    desc: "Adapta la interfaz a celular, tablet y laptop sin scroll excesivo y sincroniza los 100 diseños (20 por sección) con la DB simulada.",
    actionLabel: "Verificar 100 Diseños en DB"
  }
];

const SHOWCASE_PRESETS = [
  { code: "100 OBRAS", title: "20 DISEÑOS POR SECCIÓN" },
  { code: "POR TÍTULO", title: "ILUSTRACIÓN FIEL A CADA OBRA" },
  { code: "PRINT & CORTE", title: "SUBLIMACIÓN, VINIL, VECTORES, 3D & ARTE" }
];

const DB_KEYS = {
  user: 'cs_v8_user',
  theme: 'cs_v8_theme',
  items: 'cs_v8_items',
  saved: 'cs_v8_saved',
  logs: 'cs_v8_logs',
  orders: 'cs_v8_orders'
};

function loadOrSeed(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return structuredClone(fallback);
    }
    const parsed = JSON.parse(raw);
    if (key === DB_KEYS.items && (!Array.isArray(parsed) || parsed.length !== 100)) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return structuredClone(fallback);
    }
    return parsed;
  } catch {
    return structuredClone(fallback);
  }
}

const state = {
  theme: localStorage.getItem(DB_KEYS.theme) || 'dark',
  user: loadOrSeed(DB_KEYS.user, null),
  items: loadOrSeed(DB_KEYS.items, SEED_CATALOG),
  saved: loadOrSeed(DB_KEYS.saved, ['sub-01', 'vin-01', 'vec-01', '3d-01', 'abs-01']),
  logs: loadOrSeed(DB_KEYS.logs, [
    { id: 1, time: '08:20', type: 'success', text: '[SIM-DB] 100 diseños (20 por sección) con dibujo fiel a su título.' }
  ]),
  orders: loadOrSeed(DB_KEYS.orders, []),
  activeCategory: 'all',
  activeDivisionFilter: 'all',
  selectedDivisionId: 'div1',
  currentItem: null,
  carouselIdx: 0,
  showcaseIdx: 0,
  zoomScale: 1,
  zoomX: 0,
  zoomY: 0,
  isDraggingZoom: false,
  dragStartX: 0,
  dragStartY: 0
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const dom = {
  fxCanvas: $('#fxCanvas'),
  fxBurstBtn: $('#fxBurstBtn'),

  loginScreen: $('#loginScreen'),
  loginForm: $('#loginForm'),
  loginUser: $('#loginUser'),
  loginPass: $('#loginPass'),
  guestBtn: $('#guestBtn'),
  loginLogoBtn: $('#loginLogoBtn'),
  loginTyping: $('#loginTyping'),
  showcaseCode: $('#showcaseCode'),
  showcaseTitle: $('#showcaseTitle'),

  app: $('#app'),
  themeToggle: $('#themeToggle'),
  logoutBtn: $('#logoutBtn'),
  userName: $('#userName'),
  userRole: $('#userRole'),
  adminOnly: $$('.admin-only'),

  heroTyping: $('#heroTyping'),
  heroCanvas0: $('#heroCanvas0'),
  heroCanvas1: $('#heroCanvas1'),
  heroCanvas2: $('#heroCanvas2'),
  featuredGrid: $('#featuredGrid'),
  catalogGrid: $('#catalogGrid'),
  catalogCountPill: $('#catalogCountPill'),
  searchInput: $('#searchInput'),
  categoryChips: $('#categoryChips'),

  divisionsGrid: $('#divisionsGrid'),
  divisionFilterSelect: $('#divisionFilterSelect'),
  runnerBadge: $('#runnerBadge'),
  runnerTitle: $('#runnerTitle'),
  runnerDesc: $('#runnerDesc'),
  runnerOutput: $('#runnerOutput'),
  runDivisionActionBtn: $('#runDivisionActionBtn'),

  savedGrid: $('#savedGrid'),
  emptySaved: $('#emptySaved'),

  statTotalItems: $('#statTotalItems'),
  statEvents: $('#statEvents'),
  statOrders: $('#statOrders'),
  adminLogs: $('#adminLogs'),
  adminOrders: $('#adminOrders'),
  resetSimDbBtn: $('#resetSimDbBtn'),

  detailModal: $('#detailModal'),
  closeDetail: $('#closeDetail'),
  detailImgBox: $('#detailImgBox'),
  openLightboxBtn: $('#openLightboxBtn'),
  detailCanvas: $('#detailCanvas'),
  detailPalette: $('#detailPalette'),
  detailApplication: $('#detailApplication'),
  detailFinish: $('#detailFinish'),
  detailColorMode: $('#detailColorMode'),
  detailCategory: $('#detailCategory'),
  detailPrice: $('#detailPrice'),
  detailTitle: $('#detailTitle'),
  detailSubtitle: $('#detailSubtitle'),
  detailRes: $('#detailRes'),
  detailFormats: $('#detailFormats'),
  detailLayers: $('#detailLayers'),
  detailLicense: $('#detailLicense'),
  detailDivisionTag: $('#detailDivisionTag'),
  detailStock: $('#detailStock'),
  detailDesc: $('#detailDesc'),
  detailQuoteBtn: $('#detailQuoteBtn'),
  detailWaDirectBtn: $('#detailWaDirectBtn'),
  detailSaveBtn: $('#detailSaveBtn'),

  zoomModal: $('#zoomModal'),
  zoomStage: $('#zoomStage'),
  zoomCanvas: $('#zoomCanvas'),
  zoomImageTitle: $('#zoomImageTitle'),
  zoomSectorTag: $('#zoomSectorTag'),
  zoomLevelText: $('#zoomLevelText'),
  zoomInBtn: $('#zoomInBtn'),
  zoomOutBtn: $('#zoomOutBtn'),
  zoomResetBtn: $('#zoomResetBtn'),
  closeZoomBtn: $('#closeZoomBtn'),

  quoteModal: $('#quoteModal'),
  closeQuote: $('#closeQuote'),
  quoteForm: $('#quoteForm'),
  quoteName: $('#quoteName'),
  quoteEmail: $('#quoteEmail'),
  quoteQty: $('#quoteQty'),
  quoteService: $('#quoteService'),
  quoteNotes: $('#quoteNotes'),
  quoteCharCount: $('#quoteCharCount'),
  fabQuote: $('#fabQuote'),
  modeFormBtn: $('#modeFormBtn'),
  modeWaBtn: $('#modeWaBtn'),
  sendWhatsappQuoteBtn: $('#sendWhatsappQuoteBtn'),

  infoModal: $('#infoModal'),
  closeInfo: $('#closeInfo'),

  chatbotToggle: $('#chatbotToggle'),
  chatbotWindow: $('#chatbotWindow'),
  closeChatbot: $('#closeChatbot'),
  chatForm: $('#chatForm'),
  chatInput: $('#chatInput'),
  chatMessages: $('#chatMessages'),

  toastContainer: $('#toastContainer')
};

const splashes = [];
const FX_COLORS = ['#ff2a85', '#18e0ff', '#ffc82c', '#7c3aed', '#25d366'];

function spawnPaintThrow(x, y, count = 42) {
  const cx = typeof x === 'number' ? x : window.innerWidth * 0.5;
  const cy = typeof y === 'number' ? y : window.innerHeight * 0.45;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.45;
    const speed = 2.4 + Math.random() * 6.8;
    splashes.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 3 + Math.random() * 6.8,
      color: FX_COLORS[i % FX_COLORS.length],
      alpha: 0.96,
      decay: 0.014 + Math.random() * 0.015,
      stretch: 1.4 + Math.random() * 1.4
    });
  }
}

function initPaintCanvas() {
  const canvas = dom.fxCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = splashes.length - 1; i >= 0; i--) {
      const p = splashes[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.06;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.alpha -= p.decay;
      if (p.alpha <= 0) {
        splashes.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.r * p.stretch, p.r * 0.78, Math.atan2(p.vy, p.vx), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(loop);
  }
  loop();
}

function buildWhatsAppUrl(customText) {
  const baseMsg = customText || "Hola, quiero cotizar un diseño de CHROMA SPLAT.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(baseMsg)}`;
}

function syncDb() {
  localStorage.setItem(DB_KEYS.items, JSON.stringify(state.items));
  localStorage.setItem(DB_KEYS.saved, JSON.stringify(state.saved));
  localStorage.setItem(DB_KEYS.logs, JSON.stringify(state.logs));
  localStorage.setItem(DB_KEYS.orders, JSON.stringify(state.orders));
  if (dom.statTotalItems) dom.statTotalItems.textContent = state.items.length;
  if (dom.statEvents) dom.statEvents.textContent = state.logs.length;
  if (dom.statOrders) dom.statOrders.textContent = state.orders.length;
}

function logDb(text, type = 'info') {
  const time = new Date().toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' });
  state.logs.unshift({ id: Date.now() + Math.random(), time, type, text });
  if (state.logs.length > 60) state.logs.pop();
  syncDb();
  renderAdminLists();
}

function showToast(title, message, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  const icon = type === 'error' ? 'ph-warning-circle' : (type === 'info' ? 'ph-info' : 'ph-check-circle');
  t.innerHTML = `<i class="ph-fill ${icon} toast-icon"></i><div class="toast-content"><h4>${title}</h4><p>${message}</p></div><div class="toast-progress"></div>`;
  dom.toastContainer.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function startTyping(el, phrases) {
  if (!el) return;
  clearTimeout(el._timer);
  let pIdx = 0, cIdx = 0, deleting = false;
  function tick() {
    const word = phrases[pIdx];
    cIdx = deleting ? cIdx - 1 : cIdx + 1;
    el.textContent = word.substring(0, Math.max(0, cIdx));
    let delay = deleting ? 35 : 75;
    if (!deleting && cIdx === word.length) {
      deleting = true;
      delay = 2200;
    } else if (deleting && cIdx <= 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      delay = 450;
    }
    el._timer = setTimeout(tick, delay);
  }
  tick();
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  dom.themeToggle.innerHTML = state.theme === 'dark' ? '<i class="ph ph-sun"></i>' : '<i class="ph ph-moon"></i>';
  localStorage.setItem(DB_KEYS.theme, state.theme);
}

function loginUser(userObj) {
  state.user = userObj;
  localStorage.setItem(DB_KEYS.user, JSON.stringify(userObj));
  spawnPaintThrow(window.innerWidth * 0.5, window.innerHeight * 0.45, 56);
  logDb(`[AUTH] Sesión iniciada: ${userObj.name} (${userObj.role})`, 'success');
  showToast('Bienvenido', `Hola ${userObj.name}, 100 diseños (20 por sección) listos.`, 'success');
  checkAuth();
}

function checkAuth() {
  if (state.user) {
    dom.loginScreen.classList.add('hidden');
    dom.app.classList.remove('hidden');
    dom.userName.textContent = state.user.name;
    dom.userRole.textContent = state.user.role;
    const isAdmin = state.user.role === 'admin';
    dom.adminOnly.forEach((el) => el.classList.toggle('hidden', !isAdmin));
    if (!isAdmin && $('#screen-admin').classList.contains('active')) {
      navigateTo('home');
    }
    startTyping(dom.heroTyping, ['20 Diseños por Sección.', 'Dibujo Fiel a cada Título.', 'Zoom HD en cada Obra.']);
  } else {
    dom.loginScreen.classList.remove('hidden');
    dom.app.classList.add('hidden');
    spawnPaintThrow(window.innerWidth * 0.25, window.innerHeight * 0.3, 30);
    setTimeout(() => spawnPaintThrow(window.innerWidth * 0.75, window.innerHeight * 0.32, 30), 350);
    startTyping(dom.loginTyping, ['Estudio de diseño y corte...', '20 obras por sección...', 'Zoom HD interactivo.']);
  }
}

function navigateTo(screen) {
  $$('.screen').forEach((s) => s.classList.remove('active'));
  const target = $(`#screen-${screen}`);
  if (target) target.classList.add('active');
  $$('.nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.screen === screen));
  if (screen === 'saved') renderSaved();
  if (screen === 'admin') renderAdminLists();
  if (screen === 'catalog') renderCatalog();
  if (screen === 'home') renderFeatured();
}

function updateZoomTransform() {
  dom.zoomCanvas.style.transform = `translate(${state.zoomX}px, ${state.zoomY}px) scale(${state.zoomScale})`;
  dom.zoomLevelText.textContent = `${Math.round(state.zoomScale * 100)}%`;
}

function openImageZoom(item) {
  if (!item) return;
  state.zoomScale = 1;
  state.zoomX = 0;
  state.zoomY = 0;
  drawArtworkOnCanvas(dom.zoomCanvas, item);
  attachRealImageOrFallback(dom.zoomStage, item);
  dom.zoomImageTitle.textContent = item.title;
  dom.zoomSectorTag.textContent = SECTOR_LABELS[item.category] || item.category;
  updateZoomTransform();
  dom.zoomModal.classList.remove('hidden');
}

function setZoomLevel(nextScale) {
  state.zoomScale = Math.min(4.5, Math.max(0.75, Number(nextScale.toFixed(2))));
  if (state.zoomScale <= 1) {
    state.zoomX = 0;
    state.zoomY = 0;
  }
  updateZoomTransform();
}

function getRealDesignImageUrl(item) {
  const sector = item.category || 'abstracto';
  const title = String(item.title || '').toLowerCase();
  const seedNum = ((item.artIndex || 0) + 1) * 43 + title.length * 17;

  const REAL_DESIGN_URLS = {
    "sublimacion-dtf": [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0b?auto=format&fit=crop&w=900&q=80"
    ],
    "diseno-vinil": [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542362567-8912e3d4f0a8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549399736-c24b838a4263?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80"
    ],
    "vectores": [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=900&q=80"
    ],
    "3d": [
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1614851099511-773084f6911d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=900&q=80"
    ],
    "abstracto": [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80"
    ]
  };

  const pool = REAL_DESIGN_URLS[sector] || REAL_DESIGN_URLS["abstracto"];
  return pool[seedNum % pool.length];
}

function attachRealImageOrFallback(containerEl, item) {
  if (!containerEl || !item) return;
  const oldImg = containerEl.querySelector('img.real-design-img');
  if (oldImg) oldImg.remove();
  const oldCanvas = containerEl.querySelector('canvas');
  if (oldCanvas) oldCanvas.style.display = 'none';

  const img = document.createElement('img');
  img.className = 'real-design-img';
  img.alt = item.title;
  img.loading = 'lazy';
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  img.style.display = 'block';

  img.onload = () => {
    if (oldCanvas) oldCanvas.style.display = 'none';
  };
  img.onerror = () => {
    img.remove();
    if (oldCanvas) {
      oldCanvas.style.display = 'block';
      drawArtworkOnCanvas(oldCanvas, item);
    }
  };

  img.src = getRealDesignImageUrl(item);
  containerEl.appendChild(img);
}

function createCard(item, slim = false) {
  const isSaved = state.saved.includes(item.id);
  const sectorName = SECTOR_LABELS[item.category] || item.category;
  const card = document.createElement('div');
  card.className = 'catalog-card';
  card.innerHTML = `
    <div class="card-img-wrap">
      <span class="card-div-badge">${item.division.toUpperCase()}</span>
      <button type="button" class="card-zoom-btn" data-zoom="${item.id}" title="Ver imagen con zoom"><i class="ph ph-magnifying-glass-plus"></i></button>
      <canvas class="card-art-canvas"></canvas>
    </div>
    <div class="card-body">
      <div class="card-top-meta">
        <span>${sectorName}</span>
        <span class="card-price">${formatBs(item.priceBs)}</span>
      </div>
      <h3 class="card-title">${item.title}</h3>
      <p class="card-sub">${item.designer} · ${item.formats}</p>
      <p class="card-info-line">${item.res}</p>
      <div class="card-actions">
        <button class="btn-card-primary" data-detail="${item.id}"><i class="ph ph-tag"></i> ${slim ? 'Ver' : 'Ficha Info'}</button>
        <button class="btn-card-save ${isSaved ? 'active' : ''}" data-save="${item.id}" title="Guardar"><i class="ph ${isSaved ? 'ph-fill ph-bookmark-simple' : 'ph-bookmark'}"></i></button>
      </div>
    </div>
  `;

  const imgWrap = card.querySelector('.card-img-wrap');
  const artCanvas = card.querySelector('.card-art-canvas');
  drawArtworkOnCanvas(artCanvas, item);
  attachRealImageOrFallback(imgWrap, item);

  if (!slim && window.innerWidth > 768) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-5px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  }

  card.addEventListener('click', (e) => {
    if (e.target.closest('[data-zoom]')) {
      e.stopPropagation();
      openImageZoom(item);
      return;
    }
    if (!e.target.closest('button')) openDetail(item);
  });
  return card;
}

function renderCatalog() {
  const q = (dom.searchInput.value || '').trim().toLowerCase();
  const filtered = state.items.filter((it) => {
    const sectorLabel = (SECTOR_LABELS[it.category] || '').toLowerCase();
    const matchCat = state.activeCategory === 'all' || it.category === state.activeCategory;
    const matchDiv = state.activeDivisionFilter === 'all' || it.division === state.activeDivisionFilter;
    const matchQ =
      !q ||
      it.title.toLowerCase().includes(q) ||
      it.category.toLowerCase().includes(q) ||
      sectorLabel.includes(q) ||
      it.formats.toLowerCase().includes(q) ||
      it.application.toLowerCase().includes(q) ||
      it.desc.toLowerCase().includes(q);
    return matchCat && matchDiv && matchQ;
  });

  if (dom.catalogCountPill) {
    dom.catalogCountPill.textContent = `${filtered.length} diseños`;
  }

  dom.catalogGrid.innerHTML = '';
  if (filtered.length === 0) {
    dom.catalogGrid.innerHTML = '<p class="subtitle-muted">No se encontraron diseños en esa sección o búsqueda.</p>';
    return;
  }
  filtered.forEach((it) => dom.catalogGrid.appendChild(createCard(it, false)));
}

function renderFeatured() {
  dom.featuredGrid.innerHTML = '';
  const picks = ['sub-01', 'vin-01', 'vec-01', '3d-01', 'abs-01']
    .map((id) => state.items.find((x) => x.id === id))
    .filter(Boolean);
  picks.forEach((it) => dom.featuredGrid.appendChild(createCard(it, true)));
}

function renderSaved() {
  const list = state.items.filter((it) => state.saved.includes(it.id));
  dom.savedGrid.innerHTML = '';
  if (list.length === 0) {
    dom.emptySaved.classList.remove('hidden');
  } else {
    dom.emptySaved.classList.add('hidden');
    list.forEach((it) => dom.savedGrid.appendChild(createCard(it, false)));
  }
}

function toggleSave(id) {
  const idx = state.saved.indexOf(id);
  const item = state.items.find((x) => x.id === id);
  if (idx >= 0) {
    state.saved.splice(idx, 1);
    showToast('Quitado', 'Eliminado de tu lista de guardados.', 'info');
    if (item) logDb(`[SAVED] Removido "${item.title}"`, 'warning');
  } else {
    state.saved.push(id);
    spawnPaintThrow(window.innerWidth * 0.72, window.innerHeight * 0.35, 24);
    showToast('Guardado', 'Diseño guardado en DB simulada.', 'success');
    if (item) logDb(`[SAVED] Guardado "${item.title}" (${item.category})`, 'success');
  }
  syncDb();
  renderCatalog();
  renderFeatured();
  if ($('#screen-saved').classList.contains('active')) renderSaved();
  if (state.currentItem && state.currentItem.id === id) {
    const active = state.saved.includes(id);
    dom.detailSaveBtn.classList.toggle('active', active);
    dom.detailSaveBtn.innerHTML = `<i class="ph ${active ? 'ph-fill ph-bookmark-simple' : 'ph-bookmark'}"></i> ${active ? 'Guardado' : 'Guardar'}`;
  }
}

function openDetail(item) {
  state.currentItem = item;
  const sectorName = SECTOR_LABELS[item.category] || item.category;
  drawArtworkOnCanvas(dom.detailCanvas, item);
  attachRealImageOrFallback(dom.detailImgBox, item);
  dom.detailPalette.innerHTML = (item.palette || []).map((hex) => `<span class="palette-swatch" style="background:${hex}" title="${hex}"></span>`).join('');
  dom.detailApplication.textContent = item.application;
  dom.detailFinish.textContent = item.finish;
  dom.detailColorMode.textContent = item.colorMode;
  dom.detailCategory.textContent = sectorName;
  dom.detailPrice.textContent = formatBs(item.priceBs);
  dom.detailTitle.textContent = item.title;
  dom.detailSubtitle.innerHTML = `<i class="ph ph-tag"></i> ${sectorName} · ${item.divisionLabel} · Por ${item.designer}`;
  dom.detailRes.textContent = item.res;
  dom.detailFormats.textContent = item.formats;
  dom.detailLayers.textContent = item.layers;
  dom.detailLicense.textContent = item.license;
  dom.detailDivisionTag.textContent = item.division.toUpperCase();
  dom.detailStock.textContent = `${item.stock} disponibles`;
  dom.detailDesc.textContent = item.desc;

  dom.detailWaDirectBtn.href = buildWhatsAppUrl(`Hola, quiero cotizar el diseño "${item.title}" de la sección ${sectorName} (${formatBs(item.priceBs)}).`);

  const active = state.saved.includes(item.id);
  dom.detailSaveBtn.classList.toggle('active', active);
  dom.detailSaveBtn.innerHTML = `<i class="ph ${active ? 'ph-fill ph-bookmark-simple' : 'ph-bookmark'}"></i> ${active ? 'Guardado' : 'Guardar'}`;

  dom.detailModal.classList.remove('hidden');
  logDb(`[DETAIL] Ficha de "${item.title}" [${sectorName} · ${formatBs(item.priceBs)}]`, 'info');
}

function renderDivisions() {
  const filterVal = dom.divisionFilterSelect.value;
  dom.divisionsGrid.innerHTML = '';
  const visible = DIVISIONS_DATA.filter((d) => filterVal === 'all' || d.id === filterVal);

  visible.forEach((div) => {
    const countItems = state.items.filter((it) => it.division === div.id).length;
    const card = document.createElement('div');
    card.className = `division-card ${state.selectedDivisionId === div.id ? 'selected' : ''}`;
    card.innerHTML = `
      <div class="division-top">
        <span class="division-code">${div.code}</span>
        <span class="division-status">${div.status}</span>
      </div>
      <h3>${div.title}</h3>
      <p>${div.desc}</p>
      <div class="division-foot">
        <span>${countItems} diseños vinculados</span>
        <span>Avance ${div.progress}</span>
      </div>
    `;
    card.addEventListener('click', () => selectDivision(div.id));
    dom.divisionsGrid.appendChild(card);
  });

  selectDivision(state.selectedDivisionId);
}

function selectDivision(id) {
  state.selectedDivisionId = id;
  const div = DIVISIONS_DATA.find((d) => d.id === id) || DIVISIONS_DATA[0];
  $$('.division-card').forEach((c) => {
    const match = c.querySelector('.division-code')?.textContent === div.code;
    c.classList.toggle('selected', Boolean(match));
  });
  dom.runnerBadge.textContent = `${div.code} · ${div.progress}`;
  dom.runnerTitle.textContent = div.title;
  dom.runnerDesc.textContent = div.desc;
  dom.runDivisionActionBtn.innerHTML = `<i class="ph ph-play"></i> ${div.actionLabel}`;
}

function appendRunnerLine(msg) {
  const p = document.createElement('div');
  p.className = 'runner-log-line';
  p.textContent = msg;
  dom.runnerOutput.prepend(p);
}

function runConnectedDivisionAction() {
  const id = state.selectedDivisionId;
  const div = DIVISIONS_DATA.find((d) => d.id === id);
  if (!div) return;

  if (id === 'div1') {
    state.activeCategory = 'sublimacion-dtf';
    $$('#categoryChips .chip').forEach((ch) => ch.classList.toggle('active', ch.dataset.cat === 'sublimacion-dtf'));
    renderCatalog();
    appendRunnerLine(`[${div.code}] Filtro sincronizado en "Sublimación & DTF" (20 diseños).`);
    logDb(`[${div.code}] Filtró sección Sublimación & DTF (20 diseños).`, 'success');
    showToast('División 01 Conectada', 'Catálogo filtrado en Sublimación & DTF (20).', 'success');
  } else if (id === 'div2') {
    spawnPaintThrow(window.innerWidth * 0.5, window.innerHeight * 0.45, 48);
    const totalSaved = state.saved.length;
    appendRunnerLine(`[${div.code}] Efecto visual activo · Visor Zoom HD listo · Guardados: ${totalSaved}.`);
    logDb(`[${div.code}] Activó efecto visual y verificó visor Zoom HD.`, 'info');
    showToast('División 02 Conectada', 'Efecto visual y Zoom HD activos.', 'info');
  } else {
    const totalStock = state.items.reduce((acc, x) => acc + x.stock, 0);
    appendRunnerLine(`[${div.code}] Sim DB OK · ${state.items.length} diseños (20×5 secciones) · Stock: ${totalStock}.`);
    logDb(`[${div.code}] Diagnóstico de 100 diseños en DB simulada completado.`, 'success');
    showToast('División 03 Conectada', '100 diseños (20 por sección) verificados.', 'success');
  }
}

function renderAdminLists() {
  dom.adminLogs.innerHTML = '';
  state.logs.forEach((l) => {
    const row = document.createElement('div');
    row.className = `log-item ${l.type}`;
    row.innerHTML = `<span>${l.text}</span><span class="log-time">${l.time}</span>`;
    dom.adminLogs.appendChild(row);
  });

  dom.adminOrders.innerHTML = '';
  if (state.orders.length === 0) {
    dom.adminOrders.innerHTML = '<p class="subtitle-muted" style="text-align:center;margin-top:20px;">Aún no hay cotizaciones guardadas en la DB simulada.</p>';
    return;
  }
  state.orders.forEach((ord) => {
    const row = document.createElement('div');
    row.className = 'log-item success';
    row.style.flexDirection = 'column';
    row.style.alignItems = 'flex-start';
    row.innerHTML = `
      <div><strong>${ord.name}</strong> (${ord.email}) · <span style="color:var(--gold);font-weight:700;">${ord.service} (x${ord.qty})</span></div>
      <div>${ord.notes}</div>
      <span class="log-time">${ord.date}</span>
    `;
    dom.adminOrders.appendChild(row);
  });
}

function validateQuoteForm() {
  let ok = true;
  const nameVal = dom.quoteName.value.trim();
  const emailVal = dom.quoteEmail.value.trim();
  const qtyVal = Number(dom.quoteQty.value);
  const notesVal = dom.quoteNotes.value.trim();

  const nameGroup = dom.quoteName.parentElement;
  const emailGroup = dom.quoteEmail.parentElement;
  const qtyGroup = dom.quoteQty.parentElement;
  const notesGroup = dom.quoteNotes.parentElement;

  nameGroup.classList.toggle('invalid', nameVal.length < 3);
  if (nameVal.length < 3) ok = false;

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
  emailGroup.classList.toggle('invalid', !emailValid);
  if (!emailValid) ok = false;

  const qtyValid = Number.isInteger(qtyVal) && qtyVal >= 1 && qtyVal <= 500;
  qtyGroup.classList.toggle('invalid', !qtyValid);
  if (!qtyValid) ok = false;

  const notesValid = notesVal.length >= 10;
  notesGroup.classList.toggle('invalid', !notesValid);
  if (!notesValid) ok = false;

  return ok;
}

function openQuoteModalWithItem(item) {
  if (item) {
    const sectorName = SECTOR_LABELS[item.category] || item.category;
    const mapService = {
      "sublimacion-dtf": "Sublimación & DTF",
      "diseno-vinil": "Diseño en Vinil",
      "vectores": "Diseños Vectores",
      "3d": "Diseño 3D",
      "abstracto": "Arte Abstracto"
    };
    if (mapService[item.category]) dom.quoteService.value = mapService[item.category];
    dom.quoteNotes.value = `Cotización para "${item.title}" (${sectorName}, ${formatBs(item.priceBs)}) - `;
    dom.quoteCharCount.textContent = String(dom.quoteNotes.value.length);
  }
  dom.quoteModal.classList.remove('hidden');
}

function bindEvents() {
  if (dom.fxBurstBtn) {
    dom.fxBurstBtn.addEventListener('click', (e) => {
      spawnPaintThrow(e.clientX, e.clientY, 48);
      showToast('Efecto Activado', 'Salpicaduras visuales en pantalla.', 'info');
    });
  }

  dom.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = dom.loginUser.value.trim();
    const p = dom.loginPass.value.trim();
    let valid = true;
    if (!u) { dom.loginUser.parentElement.classList.add('invalid'); valid = false; }
    if (!p) { dom.loginPass.parentElement.classList.add('invalid'); valid = false; }
    if (!valid) return;

    const btn = $('#loginBtn');
    btn.classList.add('loading');
    setTimeout(() => {
      btn.classList.remove('loading');
      if (u === 'admin' && p === 'admin123') loginUser({ name: 'Studio Admin', role: 'admin' });
      else if (u === 'creator' && p === 'design123') loginUser({ name: 'Design Creator', role: 'creator' });
      else showToast('Credenciales inválidas', 'Usa admin/admin123 o creator/design123.', 'error');
    }, 450);
  });

  dom.loginUser.addEventListener('input', () => dom.loginUser.parentElement.classList.remove('invalid'));
  dom.loginPass.addEventListener('input', () => dom.loginPass.parentElement.classList.remove('invalid'));
  dom.guestBtn.addEventListener('click', () => loginUser({ name: 'Invitado', role: 'guest' }));
  dom.logoutBtn.addEventListener('click', () => {
    logDb(`[AUTH] ${state.user?.name || 'Usuario'} cerró sesión`, 'info');
    state.user = null;
    localStorage.removeItem(DB_KEYS.user);
    checkAuth();
  });

  dom.themeToggle.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
  });

  document.addEventListener('click', (e) => {
    const scrBtn = e.target.closest('[data-screen]');
    if (scrBtn) {
      e.preventDefault();
      navigateTo(scrBtn.dataset.screen);
    }

    const zoomBtn = e.target.closest('[data-zoom]');
    if (zoomBtn) {
      e.stopPropagation();
      const it = state.items.find((x) => x.id === zoomBtn.dataset.zoom);
      if (it) openImageZoom(it);
    }

    const detailBtn = e.target.closest('[data-detail]');
    if (detailBtn) {
      e.stopPropagation();
      const it = state.items.find((x) => x.id === detailBtn.dataset.detail);
      if (it) openDetail(it);
    }

    const saveBtn = e.target.closest('[data-save]');
    if (saveBtn) {
      e.stopPropagation();
      toggleSave(saveBtn.dataset.save);
    }
  });

  dom.searchInput.addEventListener('input', renderCatalog);
  dom.categoryChips.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    $$('#categoryChips .chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    state.activeCategory = chip.dataset.cat;
    renderCatalog();
  });

  dom.divisionFilterSelect.addEventListener('change', () => {
    state.activeDivisionFilter = dom.divisionFilterSelect.value;
    renderDivisions();
    renderCatalog();
  });

  dom.runDivisionActionBtn.addEventListener('click', runConnectedDivisionAction);

  dom.closeDetail.addEventListener('click', () => dom.detailModal.classList.add('hidden'));
  dom.detailImgBox.addEventListener('click', () => openImageZoom(state.currentItem));
  dom.openLightboxBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openImageZoom(state.currentItem);
  });

  dom.zoomInBtn.addEventListener('click', () => setZoomLevel(state.zoomScale + 0.45));
  dom.zoomOutBtn.addEventListener('click', () => setZoomLevel(state.zoomScale - 0.45));
  dom.zoomResetBtn.addEventListener('click', () => {
    state.zoomScale = 1;
    state.zoomX = 0;
    state.zoomY = 0;
    updateZoomTransform();
  });
  dom.closeZoomBtn.addEventListener('click', () => dom.zoomModal.classList.add('hidden'));
  dom.zoomStage.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.25 : -0.25;
    setZoomLevel(state.zoomScale + delta);
  }, { passive: false });
  dom.zoomCanvas.addEventListener('dblclick', () => {
    if (state.zoomScale > 1.2) {
      state.zoomScale = 1;
      state.zoomX = 0;
      state.zoomY = 0;
      updateZoomTransform();
    } else {
      setZoomLevel(2.2);
    }
  });
  dom.zoomStage.addEventListener('pointerdown', (e) => {
    if (state.zoomScale <= 1) return;
    state.isDraggingZoom = true;
    state.dragStartX = e.clientX - state.zoomX;
    state.dragStartY = e.clientY - state.zoomY;
  });
  window.addEventListener('pointermove', (e) => {
    if (!state.isDraggingZoom) return;
    state.zoomX = e.clientX - state.dragStartX;
    state.zoomY = e.clientY - state.dragStartY;
    updateZoomTransform();
  });
  window.addEventListener('pointerup', () => {
    state.isDraggingZoom = false;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dom.zoomModal.classList.add('hidden');
      dom.detailModal.classList.add('hidden');
      dom.quoteModal.classList.add('hidden');
      dom.infoModal.classList.add('hidden');
    }
  });

  dom.detailSaveBtn.addEventListener('click', () => {
    if (state.currentItem) toggleSave(state.currentItem.id);
  });
  dom.detailQuoteBtn.addEventListener('click', () => {
    dom.detailModal.classList.add('hidden');
    openQuoteModalWithItem(state.currentItem);
  });

  dom.fabQuote.addEventListener('click', () => openQuoteModalWithItem(null));
  dom.closeQuote.addEventListener('click', () => dom.quoteModal.classList.add('hidden'));

  dom.modeFormBtn.addEventListener('click', () => {
    dom.modeFormBtn.classList.add('active');
    dom.modeWaBtn.classList.remove('active');
  });

  dom.modeWaBtn.addEventListener('click', () => {
    dom.modeWaBtn.classList.add('active');
    dom.modeFormBtn.classList.remove('active');
    const summary = `Hola, deseo cotizar:
• Sección: ${dom.quoteService.value}
• Cantidad: ${dom.quoteQty.value || 1}
• Detalles: ${dom.quoteNotes.value.trim() || 'Consulta de diseño'}`;
    window.open(buildWhatsAppUrl(summary), '_blank', 'noopener,noreferrer');
    logDb(`[WA-QUOTE] Cotización abierta en WhatsApp (${dom.quoteService.value})`, 'success');
  });

  dom.sendWhatsappQuoteBtn.addEventListener('click', () => {
    const name = dom.quoteName.value.trim() || 'Cliente';
    const qty = dom.quoteQty.value.trim() || '1';
    const service = dom.quoteService.value;
    const notes = dom.quoteNotes.value.trim() || 'Consulta de diseño';
    const msg = `Hola, soy ${name}. Quiero cotizar:
• Sección: ${service}
• Cantidad: ${qty}
• Detalles: ${notes}`;
    logDb(`[WA-QUOTE] Cotización enviada por WhatsApp (${name})`, 'success');
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  });

  dom.quoteNotes.addEventListener('input', () => {
    dom.quoteCharCount.textContent = String(dom.quoteNotes.value.length);
    dom.quoteNotes.parentElement.classList.remove('invalid');
  });
  [dom.quoteName, dom.quoteEmail, dom.quoteQty].forEach((inp) => {
    inp.addEventListener('input', () => inp.parentElement.classList.remove('invalid'));
  });

  dom.quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateQuoteForm()) {
      showToast('Revisa el formulario', 'Completa todos los campos requeridos.', 'error');
      return;
    }

    const order = {
      id: Date.now(),
      name: dom.quoteName.value.trim(),
      email: dom.quoteEmail.value.trim(),
      qty: Number(dom.quoteQty.value),
      service: dom.quoteService.value,
      notes: dom.quoteNotes.value.trim(),
      date: new Date().toLocaleString('es-BO')
    };
    state.orders.unshift(order);
    spawnPaintThrow(window.innerWidth * 0.5, window.innerHeight * 0.5, 42);
    logDb(`[DB-INSERT] Cotización de ${order.name} (${order.service} x${order.qty})`, 'success');
    syncDb();
    renderAdminLists();
    dom.quoteForm.reset();
    dom.quoteCharCount.textContent = '0';
    dom.quoteModal.classList.add('hidden');
    showToast('Cotización Guardada', 'Tu solicitud por formulario quedó registrada.', 'success');
  });

  dom.resetSimDbBtn.addEventListener('click', () => {
    state.items = structuredClone(SEED_CATALOG);
    state.saved = ['sub-01', 'vin-01', 'vec-01', '3d-01', 'abs-01'];
    state.orders = [];
    state.logs = [{ id: Date.now(), time: 'AHORA', type: 'warning', text: '[SIM-DB] Restaurados los 100 diseños (20 por sección).' }];
    syncDb();
    renderCatalog();
    renderFeatured();
    renderDivisions();
    renderAdminLists();
    showToast('DB Restaurada', '100 diseños (20 por sección) restaurados.', 'info');
  });

  $$('.tab-btn').forEach((tb) => {
    tb.addEventListener('click', () => {
      $$('.tab-btn').forEach((x) => x.classList.remove('active'));
      tb.classList.add('active');
      const tab = tb.dataset.tab;
      dom.adminLogs.classList.toggle('hidden', tab !== 'logs');
      dom.adminOrders.classList.toggle('hidden', tab !== 'orders');
    });
  });

  dom.loginLogoBtn.addEventListener('click', () => dom.infoModal.classList.remove('hidden'));
  dom.closeInfo.addEventListener('click', () => dom.infoModal.classList.add('hidden'));

  dom.chatbotToggle.addEventListener('click', () => dom.chatbotWindow.classList.toggle('hidden'));
  dom.closeChatbot.addEventListener('click', () => dom.chatbotWindow.classList.add('hidden'));
  dom.chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const txt = dom.chatInput.value.trim();
    if (!txt) return;
    const uMsg = document.createElement('div');
    uMsg.className = 'chat-msg user';
    uMsg.textContent = txt;
    dom.chatMessages.appendChild(uMsg);
    dom.chatInput.value = '';

    const low = txt.toLowerCase();
    let reply = 'Tenemos 20 diseños por sección (100 en total), cada uno dibujado según su título y categoría.';
    if (low.includes('3d')) reply = 'La sección 3D tiene 20 renders con volumen y luz especular.';
    else if (low.includes('zoom')) reply = 'Haz clic en la lupa (+) de cualquier tarjeta o en la imagen de la ficha para acercar hasta 450% y arrastrar.';
    else if (low.includes('vinil')) reply = 'Diseño en Vinil tiene 20 gráficos de corte con marcas de registro y trazos definidos.';
    else if (low.includes('sublim') || low.includes('dtf')) reply = 'Sublimación & DTF tiene 20 estampados textiles con salpicaduras, ondas y trama.';
    else if (low.includes('vector')) reply = 'Diseños Vectores tiene 20 gráficos vectoriales con semitonos, polígonos y estrellas.';
    else if (low.includes('abstract')) reply = 'Abstracto tiene 20 composiciones fluidas con curvas y capas de color.';

    const bMsg = document.createElement('div');
    bMsg.className = 'chat-msg bot';
    bMsg.textContent = reply;
    dom.chatMessages.appendChild(bMsg);
    dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
  });
}

function initCarousels() {
  const heroItems = [
    state.items.find((x) => x.id === 'sub-01') || state.items[0],
    state.items.find((x) => x.id === 'vec-01') || state.items[1],
    state.items.find((x) => x.id === '3d-01') || state.items[2]
  ];
  if (dom.heroCanvas0 && heroItems[0]) drawArtworkOnCanvas(dom.heroCanvas0, heroItems[0]);
  if (dom.heroCanvas1 && heroItems[1]) drawArtworkOnCanvas(dom.heroCanvas1, heroItems[1]);
  if (dom.heroCanvas2 && heroItems[2]) drawArtworkOnCanvas(dom.heroCanvas2, heroItems[2]);

  const slides = $$('.carousel-slide');
  if (slides.length > 0) {
    setInterval(() => {
      slides[state.carouselIdx].classList.remove('active');
      state.carouselIdx = (state.carouselIdx + 1) % slides.length;
      slides[state.carouselIdx].classList.add('active');
    }, 5500);
  }

  setInterval(() => {
    state.showcaseIdx = (state.showcaseIdx + 1) % SHOWCASE_PRESETS.length;
    const d = SHOWCASE_PRESETS[state.showcaseIdx];
    if (dom.showcaseCode) dom.showcaseCode.textContent = d.code;
    if (dom.showcaseTitle) dom.showcaseTitle.textContent = d.title;
  }, 3600);
}

function init() {
  applyTheme();
  initPaintCanvas();
  syncDb();
  checkAuth();
  bindEvents();
  renderFeatured();
  renderCatalog();
  renderDivisions();
  renderAdminLists();
  initCarousels();
}

document.addEventListener('DOMContentLoaded', init);

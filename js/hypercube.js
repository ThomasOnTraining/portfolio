// Hipercubo ASCII · hero da página inicial · sem dependências
// Tesseract 4D real (16 vértices, 32 arestas) desenhado como grade de
// caracteres em <canvas>, com rotação suave e respeito a prefers-reduced-motion.
(function () {
  "use strict";

  var canvas = document.getElementById("hipercubo");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");

  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Geometria do tesseract ----------
  var vertices = [];
  for (var i = 0; i < 16; i++) {
    vertices.push([
      (i & 1) ? 1 : -1,
      (i & 2) ? 1 : -1,
      (i & 4) ? 1 : -1,
      (i & 8) ? 1 : -1
    ]);
  }
  var edges = [];
  for (var a = 0; a < 16; a++) {
    for (var b = a + 1; b < 16; b++) {
      var xor = a ^ b;
      if (xor === 1 || xor === 2 || xor === 4 || xor === 8) edges.push([a, b]);
    }
  }

  // ---------- Estado ----------
  var angXW = 0.6, angYZ = 0.2, angXY = 0;              // rotações 4D/3D
  var velXW = 0.0035, velYZ = 0.0021, velXY = 0.0012;   // rad por frame (~30 fps)
  var W = 0, H = 0, cellW = 0, cellH = 0, cols = 0, rows = 0, grid = null, base = 0;
  var chars = "\u00B7:+*#";                              // intensidade → caractere
  var FONT_SIZE = 13;
  var WD = 3, ZD = 4; // distâncias de projeção 4D→3D e 3D→2D

  function configurar() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    if (!W || !H) return false;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = FONT_SIZE + "px ui-monospace, 'Cascadia Mono', Consolas, monospace";
    var m = ctx.measureText("M");
    cellW = Math.max(m.width, 7);
    cellH = Math.round(FONT_SIZE * 1.05);
    cols = Math.ceil(W / cellW);
    rows = Math.ceil(H / cellH);
    grid = new Float32Array(cols * rows);
    base = Math.min(W, H) * 0.46 / 2.9; // escala da projeção
    return true;
  }

  function rotacionar(v, a1, a2, a3) {
    var x = v[0], y = v[1], z = v[2], w = v[3];
    var c = Math.cos(a1), s = Math.sin(a1);
    var x2 = x * c - w * s, w2 = x * s + w * c;         // plano XW (4D)
    var c2 = Math.cos(a2), s2 = Math.sin(a2);
    var y2 = y * c2 - z * s2, z2 = y * s2 + z * c2;     // plano YZ
    var c3 = Math.cos(a3), s3 = Math.sin(a3);
    var x3 = x2 * c3 - y2 * s3, y3 = x2 * s3 + y2 * c3; // plano XY (bem lento)
    return [x3, y3, z2, w2];
  }

  function projetar(p) {
    var k4 = WD / (WD - p[3]);
    var x = p[0] * k4, y = p[1] * k4, z = p[2] * k4;
    var k3 = ZD / (ZD - z);
    // t combinado (0..1): mistura profundidade 3D e posição na 4ª dimensão
    var t = ((z + 1.6) / 3.2) * 0.55 + ((p[3] + 1) / 2) * 0.45;
    return { x: x * k3 * base, y: y * k3 * base, t: t };
  }

  function desenhar() {
    ctx.clearRect(0, 0, W, H);
    grid.fill(0);

    var pts = [];
    for (var i = 0; i < 16; i++) {
      pts.push(projetar(rotacionar(vertices[i], angXW, angYZ, angXY)));
    }

    var AMOSTRAS = 22;
    for (var e = 0; e < edges.length; e++) {
      var p1 = pts[edges[e][0]], p2 = pts[edges[e][1]];
      for (var s = 0; s <= AMOSTRAS; s++) {
        var f = s / AMOSTRAS;
        var col = Math.floor(((p1.x + (p2.x - p1.x) * f) / cellW) + cols / 2);
        var row = Math.floor(((p1.y + (p2.y - p1.y) * f) / cellH) + rows / 2);
        if (col < 0 || col >= cols || row < 0 || row >= rows) continue;
        var t = p1.t + (p2.t - p1.t) * f;
        var idx = row * cols + col;
        if (t > grid[idx]) grid[idx] = t;
      }
    }

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    var halfW = cellW / 2, halfH = cellH / 2;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var v = grid[r * cols + c];
        if (v < 0.04) continue;
        var ci = Math.min(chars.length - 1, Math.floor(v * chars.length));
        var alpha = 0.2 + v * 0.65;
        ctx.fillStyle = "rgba(2,132,199," + alpha.toFixed(3) + ")";
        ctx.fillText(chars.charAt(ci), c * cellW + halfW, r * cellH + halfH);
      }
    }
  }

  function passo() {
    angXW += velXW; angYZ += velYZ; angXY += velXY;
    desenhar();
  }

  // ---------- Loop (limitado a ~30 fps) ----------
  var raf = null, ultimo = 0, INTERVALO = 1000 / 30;

  function frame(ts) {
    if (ts - ultimo >= INTERVALO) { ultimo = ts; passo(); }
    raf = requestAnimationFrame(frame);
  }

  function parar() {
    if (raf) { cancelAnimationFrame(raf); raf = null; }
  }

  function iniciar() {
    if (!configurar()) return;
    if (reduzido) { passo(); return; } // movimento reduzido: um frame estático
    parar();
    raf = requestAnimationFrame(frame);
  }

  document.addEventListener("visibilitychange", function () {
    if (reduzido) return;
    if (document.hidden) { parar(); }
    else if (!raf) { raf = requestAnimationFrame(frame); }
  });

  window.addEventListener("resize", function () {
    iniciar();
  });

  iniciar();
})();
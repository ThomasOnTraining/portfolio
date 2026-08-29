// Interações do portfólio · sem dependências
(function () {
  "use strict";

  // ---------- Menu mobile ----------
  var btn = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var aberto = nav.classList.toggle("aberto");
      btn.setAttribute("aria-expanded", String(aberto));
      btn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });
    // Fecha o menu ao clicar em um link (útil no mobile)
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("aberto")) {
        nav.classList.remove("aberto");
        btn.setAttribute("aria-expanded", "false");
        btn.setAttribute("aria-label", "Abrir menu");
      }
    });
  }

  // ---------- Reveal suave no scroll ----------
  var alvos = document.querySelectorAll(".reveal");
  var suportado = "IntersectionObserver" in window;
  if (suportado && alvos.length) {
    var obs = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("revelado");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    alvos.forEach(function (el) { obs.observe(el); });
  } else {
    // Sem suporte (ou navegador antigo): mostra tudo
    alvos.forEach(function (el) { el.classList.add("revelado"); });
  }

  // ---------- Ano no rodapé ----------
  var ano = document.querySelector("[data-ano]");
  if (ano) { ano.textContent = String(new Date().getFullYear()); }
})();

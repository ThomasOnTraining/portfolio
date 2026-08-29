# PortfÃ³lio Â· Thomas Thome

Site multi-pÃ¡gina em HTML + CSS + JavaScript puros, sem frameworks e sem build tools.
Paleta: `#262621` `#BFBFAE` `#73675A` `#8C8072` `#BBB9B3` Â· Tipos: Fraunces + Inter.
GitHub: [@ThomasOnTraining](https://github.com/ThomasOnTraining)

## âœ… Checklist de personalizaÃ§Ã£o (o que falta trocar)

Procure por `TODO` nos arquivos. Resumo:

- [x] **`index.html`** â†’ destaques preenchidos: CartelaStudy e Maratona Tech 2026
- [ ] **`sobre.html`** â†’ complete a frase marcada com TODO (como vocÃª chegou Ã  Ã¡rea) e deixe as listas de habilidades honestas
- [x] **`projetos.html`** â†’ CartelaStudy, Maratona Tech 2026 e Este portfÃ³lio preenchidos; confira os links do card "Este portfÃ³lio"
- [ ] **`contato.html`** â†’ e-mail e GitHub jÃ¡ estÃ£o certos; adicione LinkedIn quando criar
- [ ] **`404.html`** â†’ ajuste a URL do exemplo do `curl` se mudar o endereÃ§o final do site

Dica de conteÃºdo: para cada projeto, escreva **problema â†’ o que vocÃª construiu â†’ 1 desafio
tÃ©cnico e como resolveu**. Isso vale mais que qualquer lista de tecnologias.

## ðŸš€ Publicar no GitHub Pages

1. Crie um repositÃ³rio pÃºblico chamado `portfolio` (ou qualquer nome).
2. Na pasta do projeto:

   ```bash
   git init
   git add .
   git commit -m "feat: portfÃ³lio inicial"
   git branch -M main
   git remote add origin https://github.com/ThomasOnTraining/portfolio.git
   git push -u origin main
   ```

3. No GitHub: **Settings â†’ Pages â†’ Source: Deploy from a branch â†’ Branch: `main` / root â†’ Save**.
4. Em ~1 minuto o site fica no ar em `https://thomasontraining.github.io/portfolio/`.

> Se o repositÃ³rio se chamar `thomasontraining.github.io`, o site fica na raiz:
> `https://thomasontraining.github.io/`.

Todas as referÃªncias internas usam **caminhos relativos**, entÃ£o funciona em subpasta
ou na raiz sem alterar nada.

## ðŸ—‚ Estrutura

```
â”œâ”€â”€ index.html        # home: hero, destaque de projetos, "o que eu faÃ§o"
â”œâ”€â”€ sobre.html        # trajetÃ³ria + habilidades
â”œâ”€â”€ projetos.html     # lista completa de projetos
â”œâ”€â”€ contato.html      # e-mail e GitHub
â”œâ”€â”€ 404.html          # pÃ¡gina de erro personalizada (usada pelo GitHub Pages)
â”œâ”€â”€ css/style.css     # design tokens + estilos
â”œâ”€â”€ js/main.js        # menu mobile, reveal no scroll, ano do rodapÃ©
â””â”€â”€ assets/           # favicon
```

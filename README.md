# portfolioHUB — Portfólio Profissional Digital

> Entrega inicial do desafio “Criação de um Portfólio Profissional Digital”.

## 🔎 Visão geral

O **portfolioHUB** é um site em **React + Vite** com animações e UI modernas. Ele organiza suas informações em seções claras (Perfil, Currículo, Projetos, Habilidades, Recomendações e Contato) e traz componentes reutilizáveis para acelerar a manutenção.

* **Stack principal:** React 18, Vite 5, Tailwind CSS, GSAP, Lottie, React Icons.
* **UX:** animações por scroll, vídeo de abertura, navegação sticky e layout “bento grid”.
* **Deploy recomendado:** Vercel ou GitHub Pages.

---

## 🧩 Componentes principais

* **Navbar**: menu com âncoras e modo mobile.
* **Hero**: vídeo de capa, botões para LinkedIn e GitHub.
* **About/Mission**: título animado com GSAP e vídeo contextual.
* **Project (Bento Grid)**: apresentação de projetos com vídeos e botões para certificados.
* **Footer**: redes sociais e e‑mail de contato.
* **PageLoader**: splash com Lottie + contador até app estar pronto.
* **Button/AnimatedTitle/VideoPreview**: utilitários de UI e animação.

> As mídias residem em `public/videos` e são detectadas dinamicamente no **Hero**.

---

## 🛠️ Tecnologias e dependências

* **React 18** + **Vite** para DX rápida.
* **Tailwind CSS** para utilitários de estilo.
* **GSAP** (+ ScrollTrigger) para animações.
* **Lottie** para a animação de carregamento.
* **React Icons** para ícones.
* **@splinetool** (opcional) para 3D em futuras seções.

Scripts úteis:

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

---

## ▶️ Como rodar localmente

1. **Pré‑requisitos**: Node.js 18+ e npm.
2. **Instalar**:

```bash
npm install
```

3. **Executar**:

```bash
npm run dev
```

4. Acesse o endereço indicado pelo Vite (ex.: `http://localhost:5173`).

---

## 🚀 Deploy

### Vercel

1. Importar o repositório no painel da Vercel.
2. Framework: **Vite**.
3. Build: `npm run build` | Output: `dist/`.
4. Deploy.

### GitHub Pages

1. Adicione no `vite.config.js` a base se publicar em `<user>.github.io/<repo>`:

```js
export default defineConfig({ base: '/<repo>/' })
```

2. Build: `npm run build`.
3. Publique a pasta `dist/` via GitHub Pages (branch `gh-pages` usando uma ação CI ou `git subtree`).

---

## 🧪 Qualidade e Acessibilidade

* Lighthouse ≥ 90 em Performance e Acessibilidade.
* Texto alternativo em imagens/vídeos chave.
* Contraste mínimo WCAG AA.
* Navegação por teclado testada.

---

## 🤝 Contribuição

1. Crie uma branch feature: `feat/nome-da-feature`.
2. Commits semânticos.
3. Abra PR com descrição e prints/gifs.

---

## 📜 Licença

Licenciado sob a **MIT License**. Veja **LICENSE**.

```
MIT License

Copyright (c) 2025 <Seu Nome>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🔗 Links úteis

* React: [https://react.dev](https://react.dev)
* Vite: [https://vitejs.dev](https://vitejs.dev)
* Tailwind: [https://tailwindcss.com](https://tailwindcss.com)
* GSAP: [https://gsap.com](https://gsap.com)
* Lottie: [https://lottiefiles.com](https://lottiefiles.com)
* Vercel: [https://vercel.com](https://vercel.com)
* GitHub Pages: [https://pages.github.com](https://pages.github.com)

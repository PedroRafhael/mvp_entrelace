# Entrelace (React)

Versão em React do protótipo HTML/CSS do Entrelace, com o mesmo design e as páginas conectadas por rotas.

## Como rodar

```bash
npm install
npm run dev
```

## Rotas

| Rota      | Página (original) | Navega para                                                |
| --------- | ----------------- | ---------------------------------------------------------- |
| `/`       | `index.html`      | `/login` (Entrar, Criar Conta, Começar Agora)              |
| `/login`  | `login.html`      | `/mural` (entrar e botões sociais), `/` (logo)             |
| `/mural`  | `mural.html`      | `/chat` (Mensagens), `/perfil` (Meu Perfil), `/` (Sair)    |
| `/perfil` | `perfil.html`     | `/mural`, `/chat`, `/` (Sair); "Iniciar Conversa" → `/chat` |
| `/chat`   | `chat.html`       | `/mural` (Voltar à comunidade)                             |

## Estrutura

```
src/
├── pages/      # Home, Login, Mural, Perfil, Chat (HTML original convertido para JSX)
├── styles/     # CSS original de cada página, sem alterações
├── hooks/usePage.js     # injeta o CSS da página ao entrar na rota e remove ao sair
├── lib/chatStorage.js   # localStorage das conversas (mesmas chaves do chat.html)
├── App.jsx     # rotas
└── main.jsx
```

Cada página tinha seu próprio CSS (com `body`, `.navbar`, `.btn-primary`... diferentes),
por isso o hook `usePage` carrega só o CSS da página atual, evitando conflitos e
preservando o visual idêntico ao original.

import usePage from '../hooks/usePage.js'
import Navbar from '../components/Navbar.jsx'
import muralCss from '../styles/mural.css?inline'
import navbarCss from '../styles/navbar.css?inline'

const css = muralCss + navbarCss

const FILTROS = [
  { id: 'todos', label: 'Todos' },
  { id: 'seguranca', label: 'Segurança' },
  { id: 'ajuda', label: 'Ajuda Mútua' },
  { id: 'eventos', label: 'Eventos' },
]

const TAGS = { seguranca: 'Segurança', ajuda: 'Ajuda Mútua', eventos: 'Eventos' }

const POSTS = [
  {
    id: 1,
    autor: 'Gabriel Santos',
    tempo: 'há 15 min',
    categoria: 'seguranca',
    texto: 'Atenção moradores da Rua das Flores: iluminação do poste da esquina está apagada.',
    curtidas: 4,
    comentarios: '2 comentários',
  },
  {
    id: 2,
    autor: 'Lara Oliveira',
    tempo: 'há 2 horas',
    categoria: 'ajuda',
    texto: 'Alguém tem uma escada dobrável para emprestar nesta tarde?',
    curtidas: 2,
    comentarios: '5 comentários',
  },
]

export default function Mural() {
  usePage({ css, title: 'Entrelace - Mural da Comunidade' })

  return (
    <>
      <Navbar active />

      <main className="container">

        {/* Filtros em CSS puro: os radios precisam ser irmãos do header e do feed */}
        {FILTROS.map((f) => (
          <input
            key={f.id}
            type="radio"
            name="mural-filter"
            id={`filter-${f.id}`}
            className="filter-radio"
            defaultChecked={f.id === 'todos'}
          />
        ))}

        <header className="mural-header">
          <div className="mural-title-area">
            <h1>Mural da Comunidade</h1>
            <p>Exibindo publicações validadas para <strong>Centro Histórico</strong></p>
          </div>

          <div className="mural-actions">
            <div className="filters">
              {FILTROS.map((f) => (
                <label key={f.id} htmlFor={`filter-${f.id}`} className="filter-btn">{f.label}</label>
              ))}
            </div>
            <button className="btn-primary">
              <i className="ph ph-plus"></i> Nova Publicação
            </button>
          </div>
        </header>

        <section className="feed">
          {POSTS.map((p) => (
            <article key={p.id} className={`post-card cat-${p.categoria}`}>
              <header className="post-header">
                <div className="post-author-info">
                  <div className="avatar-placeholder">{p.autor.charAt(0)}</div>
                  <div>
                    <h2 className="author-name">{p.autor}</h2>
                    <span className="post-time">{p.tempo}</span>
                  </div>
                </div>
                <span className={`tag tag-${p.categoria}`}>{TAGS[p.categoria]}</span>
              </header>
              <div className="post-content">
                <p>{p.texto}</p>
              </div>
              <footer className="post-footer">
                <button className="action-btn"><i className="ph ph-thumbs-up"></i> {p.curtidas}</button>
                <button className="action-btn"><i className="ph ph-chat-circle"></i> {p.comentarios}</button>
              </footer>
            </article>
          ))}
          <div className="empty-state">
            <i className="ph ph-folder-open"></i>
            <h2>Nenhuma publicação</h2>
            <p>Ainda não há postagens para esta categoria no momento.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Entrelace - Protótipo Acadêmico de Front-End (Sem Back-end)</p>
      </footer>
    </>
  )
}

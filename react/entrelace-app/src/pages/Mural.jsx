import { Link } from 'react-router-dom'
import usePage from '../hooks/usePage.js'
import css from '../styles/mural.css?inline'

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
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo-container">
            <div className="logo-icon"><i className="ph-fill ph-circles-three-plus"></i></div>
            <span className="logo-text">Entrelace</span>
          </div>
          <span className="badge-wireframe">Wireframe MVP</span>
        </div>

        <div className="nav-center">
          <div className="location-selector">
            <i className="ph ph-map-pin"></i>
            <span>Bairro:</span>
            <select>
              <option value="centro-historico">Centro Histórico</option>
            </select>
          </div>
        </div>

        <div className="nav-right">
          <Link to="/mural" className="nav-link active">Mural</Link>

          <div className="user-profile">

            <i className="ph ph-caret-down" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}></i>

            <div className="dropdown-menu">
              <Link to="/chat" className="dropdown-item">
                <i className="ph ph-chat-circle"></i> Mensagens
                <span className="notification-badge">2</span>
              </Link>
              <Link to="/perfil" className="dropdown-item">
                <i className="ph ph-user"></i> Meu Perfil
              </Link>
              <hr className="dropdown-divider" />
              <Link to="/" className="dropdown-item logout">
                <i className="ph ph-sign-out"></i> Sair
              </Link>
            </div>
          </div>
        </div>
      </nav>

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

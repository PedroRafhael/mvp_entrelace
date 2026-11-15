import { useEffect, useRef, useState } from 'react'
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

const TAGS = { geral: 'Geral', seguranca: 'Segurança', ajuda: 'Ajuda Mútua', eventos: 'Eventos' }

const CATEGORIAS = [
  { id: 'geral', label: 'Geral' },
  { id: 'seguranca', label: 'Segurança' },
  { id: 'ajuda', label: 'Ajuda Mútua' },
  { id: 'eventos', label: 'Eventos' },
]

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

  // MVP: as publicações novas vivem só na memória da página (somem ao recarregar)
  const [posts, setPosts] = useState(POSTS)
  const [modalAberto, setModalAberto] = useState(false)
  const [texto, setTexto] = useState('')
  const [categoria, setCategoria] = useState('geral')
  const campoRef = useRef(null)

  function abrirModal() {
    setTexto('')
    setCategoria('geral')
    setModalAberto(true)
  }

  function publicar(e) {
    e.preventDefault()
    const conteudo = texto.trim()
    if (!conteudo) return
    setPosts((atual) => [
      { id: Date.now(), autor: 'Você', tempo: 'agora', categoria, texto: conteudo, curtidas: 0, comentarios: '0 comentários' },
      ...atual,
    ])
    // Volta para "Todos" para a nova publicação aparecer, independente do filtro ativo
    const todos = document.getElementById('filter-todos')
    if (todos) todos.checked = true
    setModalAberto(false)
  }

  useEffect(() => {
    if (!modalAberto) return
    campoRef.current?.focus()
    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setModalAberto(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflowAnterior
      document.removeEventListener('keydown', onKey)
    }
  }, [modalAberto])

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
            <button className="btn-primary" onClick={abrirModal}>
              <i className="ph ph-plus"></i> Nova Publicação
            </button>
          </div>
        </header>

        <section className="feed">
          {posts.map((p) => (
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

      {/* Modal: Nova Publicação */}
      <div
        className={'modal-backdrop' + (modalAberto ? ' open' : '')}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={(e) => {
          if (e.target === e.currentTarget) setModalAberto(false)
        }}
      >
        <form className="modal" onSubmit={publicar}>
          <div className="modal-header">
            <h2 id="modal-titulo">Nova Publicação</h2>
            <button type="button" className="modal-close" aria-label="Fechar" onClick={() => setModalAberto(false)}>
              <i className="ph ph-x"></i>
            </button>
          </div>

          <div className="modal-field">
            <label htmlFor="post-texto">O que está acontecendo na comunidade?</label>
            <textarea
              id="post-texto"
              ref={campoRef}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Compartilhe um aviso, dúvida ou necessidade com seus vizinhos..."
            />
          </div>

          <div className="modal-field">
            <label htmlFor="post-categoria">Categoria (Opcional - A IA atua na triagem)</label>
            <select id="post-categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              {CATEGORIAS.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-text" onClick={() => setModalAberto(false)}>Cancelar</button>
            <button type="submit" className="btn-primary" disabled={!texto.trim()}>Publicar</button>
          </div>
        </form>
      </div>
    </>
  )
}

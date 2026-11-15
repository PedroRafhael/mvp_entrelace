import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import usePage from '../hooks/usePage.js'
import { iniciarConversa } from '../lib/chatStorage.js'
import css from '../styles/perfil.css?inline'

const FOTO_USUARIO =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
const FOTO_PERFIL =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces'

export default function Perfil() {
  usePage({ css, title: 'Entrelace | Perfil do morador' })
  const navigate = useNavigate()

  const [modalAberto, setModalAberto] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [toast, setToast] = useState({ texto: '', visivel: false })
  const campoRef = useRef(null)
  const timerRef = useRef(null)

  function mostrarToast(texto) {
    clearTimeout(timerRef.current)
    setToast({ texto, visivel: true })
    timerRef.current = setTimeout(() => setToast((t) => ({ ...t, visivel: false })), 2800)
  }

  function fecharModal() {
    setModalAberto(false)
    setMensagem('')
  }

  function enviar() {
    const texto = mensagem.trim()
    if (!texto) {
      campoRef.current?.focus()
      mostrarToast('Digite uma mensagem antes de enviar.')
      return
    }
    iniciarConversa('Mariana Silva', texto)
    navigate('/chat')
  }

  useEffect(() => {
    if (modalAberto) campoRef.current?.focus()
  }, [modalAberto])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setModalAberto(false)
        setMensagem('')
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <>
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">⌘</div>
          <span className="brand-name">Entrelace</span>
          <span className="tag">Wireframe MVP</span>
        </div>
        <button
          className="neighborhood"
          type="button"
          onClick={() => mostrarToast('Seletor de bairros: conecte aqui os bairros cadastrados.')}
        >
          <span className="pin">⌖</span> Bairro: <strong>Centro Histórico</strong>⌄
        </button>
        <nav className="nav" aria-label="Navegação principal">
          <Link to="/mural">Mural</Link>
          <Link to="/chat">Mensagens<span className="count">2</span></Link>
          <button
            className="profile-link"
            type="button"
            onClick={() => mostrarToast('Você já está visualizando um perfil de morador.')}
          >
            Meu Perfil
          </button>
        </nav>
        <div className="user-mini">
          <img src={FOTO_USUARIO} alt="Foto do usuário" />
          <button className="logout" type="button" onClick={() => navigate('/')}>Sair</button>
        </div>
      </header>

      <main>
        <section className="profile-card" aria-label="Perfil de morador">
          <div className="cover"></div>
          <div className="profile-content">
            <img className="avatar" src={FOTO_PERFIL} alt="Foto de Mariana Silva" />
            <div className="action-row">
              <button className="primary" type="button" onClick={() => setModalAberto(true)}>
                <span>▤</span> Iniciar Conversa Privada
              </button>
            </div>
            <div className="person-line">
              <h1>Mariana Silva</h1>
              <span className="verified">Morador Validado</span>
            </div>
            <div className="location"><span>⌖</span>Residentes em Centro Histórico</div>
            <div className="privacy">
              <span><strong>⛨</strong>Contato protegido via Entrelace</span>
              <span className="hidden">Telefone oculto</span>
            </div>
          </div>
        </section>

        <section id="publicacoes">
          <h2 className="section-title">Publicações deste morador</h2>
          <article className="post">
            <p>"Alguém tem indicação de eletricista no bairro?"</p>
            <small>Postado há 3 dias no Centro Histórico</small>
          </article>
        </section>
      </main>

      <div
        className={'modal-backdrop' + (modalAberto ? ' open' : '')}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        onClick={(e) => {
          if (e.target === e.currentTarget) fecharModal()
        }}
      >
        <div className="modal">
          <h2 id="modalTitle">Conversa privada</h2>
          <p>Envie uma mensagem para Mariana. Seu número de telefone continuará protegido pelo Entrelace.</p>
          <textarea
            ref={campoRef}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Escreva sua mensagem..."
            aria-label="Sua mensagem"
          />
          <div className="modal-actions">
            <button className="secondary" type="button" onClick={fecharModal}>Cancelar</button>
            <button className="primary" type="button" onClick={enviar}>Enviar mensagem</button>
          </div>
        </div>
      </div>
      <div className={'toast' + (toast.visivel ? ' show' : '')} role="status">{toast.texto}</div>
    </>
  )
}

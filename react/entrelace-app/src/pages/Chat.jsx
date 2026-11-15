import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import usePage from '../hooks/usePage.js'
import { horaAtual, loadActive, loadChats, saveActive, saveChats } from '../lib/chatStorage.js'
import css from '../styles/chat.css?inline'

export default function Chat() {
  usePage({ css, title: 'Entrelace - Conversas' })

  const [chats, setChats] = useState(loadChats)
  const [active, setActive] = useState(() => {
    const salvo = loadActive()
    return chats[salvo] ? salvo : ''
  })
  const [busca, setBusca] = useState('')
  const [texto, setTexto] = useState('')
  const [mostrarLista, setMostrarLista] = useState(false) // alterna lista/conversa no mobile
  const mensagensRef = useRef(null)

  const nomes = Object.keys(chats)
  const mensagens = chats[active] || []
  const termo = busca.toLowerCase()

  useEffect(() => {
    saveChats(chats)
    saveActive(active)
  }, [chats, active])

  useEffect(() => {
    const el = mensagensRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [active, mensagens.length])

  function abrirConversa(nome) {
    setActive(nome)
    setTexto('')
    setMostrarLista(false)
  }

  function enviar(e) {
    e.preventDefault()
    const valor = texto.trim()
    if (!valor) return
    setChats((atual) => ({
      ...atual,
      [active]: [...(atual[active] || []), { from: 'me', text: valor, time: horaAtual() }],
    }))
    setTexto('')
  }

  return (
    <>
      <header className="top">
        <div className="logo"><i className="ph-fill ph-circles-three-plus"></i>Entrelace</div>
        <Link className="back" to="/mural">← Voltar à comunidade</Link>
      </header>

      <main className="layout">
        <aside className={'sidebar' + (mostrarLista ? ' show' : '')} id="sidebar">
          <div className="sidehead">
            <h1>Conversas</h1>
            <input
              id="search"
              className="search"
              placeholder="Buscar conversa..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <div className="list" id="list">
            {nomes.length === 0 ? (
              <div className="empty-list">
                <i className="ph ph-chat-circle"></i>
                <p>Nenhuma conversa ainda.</p>
              </div>
            ) : (
              nomes.map((nome) => {
                const ultima = chats[nome].at(-1)?.text || 'Conversa iniciada'
                if (!(nome + ultima).toLowerCase().includes(termo)) return null
                return (
                  <div
                    key={nome}
                    className={'person' + (nome === active ? ' active' : '')}
                    onClick={() => abrirConversa(nome)}
                  >
                    <div className="avatar">{nome.charAt(0).toUpperCase()}</div>
                    <div>
                      <strong>{nome}</strong>
                      <small>{ultima}</small>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </aside>

        <section className={'chat' + (mostrarLista ? ' hide' : '')} id="chat">
          {!active ? (
            <div className="empty">
              <i className="ph ph-chats"></i>
              <h2>Suas conversas</h2>
              <p>Entre no mural da comunidade e toque em “Conversar” em uma publicação para iniciar uma conversa privada.</p>
            </div>
          ) : (
            <>
              <div className="chathead">
                <button type="button" className="mobile-back" onClick={() => setMostrarLista(true)}>←</button>
                <div className="avatar">{active.charAt(0).toUpperCase()}</div>
                <div>
                  <strong>{active}</strong>
                  <small>Conversa privada • telefone protegido</small>
                </div>
              </div>
              <div className="messages" ref={mensagensRef}>
                {mensagens.map((m, i) => (
                  <div key={i} className={'bubble' + (m.from === 'me' ? ' mine' : '')}>
                    {m.text}
                    <span className="time">{m.time || ''}</span>
                  </div>
                ))}
                {mensagens.length === 0 && (
                  <div className="empty">Conversa iniciada. Envie a primeira mensagem.</div>
                )}
              </div>
              <div className="privacy">Suas mensagens ficam salvas somente neste navegador neste protótipo.</div>
              <form className="composer" onSubmit={enviar}>
                <input
                  placeholder="Digite sua mensagem..."
                  maxLength={1000}
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                />
                <button className="send">Enviar</button>
              </form>
            </>
          )}
        </section>
      </main>
    </>
  )
}

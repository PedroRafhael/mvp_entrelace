import usePage from '../hooks/usePage.js'
import Navbar from '../components/Navbar.jsx'
import navbarCss from '../styles/navbar.css?inline'
import navbarVarsCss from '../styles/navbar-vars.css?inline'
import perfilCss from '../styles/perfil.css?inline'

const css = perfilCss + navbarVarsCss + navbarCss

const FOTO_PERFIL =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces'

export default function Perfil() {
  usePage({ css, title: 'Entrelace | Perfil do morador' })

  return (
    <>
      <Navbar />

      <main>
        <section className="profile-card" aria-label="Perfil de morador">
          <div className="cover"></div>
          <div className="profile-content">
            <img className="avatar" src={FOTO_PERFIL} alt="Foto de Mariana Silva" />
            {/* Espaço reservado para a foto sobrepor a capa */}
            <div className="action-row"></div>
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
    </>
  )
}

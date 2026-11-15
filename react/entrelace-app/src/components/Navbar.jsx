import { Link, useNavigate } from 'react-router-dom'

/**
 * Navbar das páginas internas (Mural, Perfil e Chat): mesmo menu em todas,
 * com o dropdown do usuário. O CSS vem de styles/navbar.css.
 * `active` marca o link "Mural" como ativo (usado na página do mural).
 */
export default function Navbar({ active = false }) {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div
          className="logo-container"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/mural')}
        >
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
        <Link to="/mural" className={'nav-link' + (active ? ' active' : '')}>Mural</Link>

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
  )
}

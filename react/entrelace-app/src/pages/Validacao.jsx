import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import usePage from '../hooks/usePage.js'
import css from '../styles/validacao.css?inline'

export default function Validacao() {
  usePage({ css, title: 'Entrelace - Validação de Residência' })
  const navigate = useNavigate()
  const [arquivo, setArquivo] = useState('')

  const enviar = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <>
      {/* Barra de Navegação Superior */}
      <nav className="navbar">
        <div className="nav-left">
          <div
            className="logo-container"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <div className="logo-icon"><i className="ph-fill ph-circles-three-plus"></i></div>
            <span className="logo-text">Entrelace</span>
          </div>
          <span className="badge-wireframe">Wireframe MVP</span>
        </div>

        <div className="nav-right">
          <Link to="/login" className="nav-link">Entrar</Link>
          <button className="btn-primary">Criar Conta</button>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="validation-container">
        <section className="validation-card">

          {/* Cabeçalho do Card */}
          <header className="card-header">
            <div className="header-icon">
              <i className="ph ph-identification-card"></i>
            </div>
            <h1>Validação de Residência</h1>
            <p>Informe seu CEP e envie um comprovante para liberar o acesso ao mural da sua região.</p>
          </header>

          {/* Formulário de Validação */}
          <form className="validation-form" onSubmit={enviar}>

            {/* Campo CEP */}
            <div className="form-group">
              <label htmlFor="cep">CEP DE RESIDÊNCIA</label>
              <input type="text" id="cep" placeholder="90000-000" maxLength={9} required />
            </div>

            {/* Campo Upload de Arquivo */}
            <div className="form-group">
              <label htmlFor="comprovante">COMPROVANTE DE RESIDÊNCIA (CONTA DE LUZ/ÁGUA)</label>
              <label htmlFor="comprovante" className="upload-area">
                <i className="ph ph-upload-simple"></i>
                <span className="upload-title">{arquivo || 'Clique para selecionar o arquivo'}</span>
                <span className="upload-subtitle">PDF, PNG ou JPG até 5MB</span>
                <input
                  type="file"
                  id="comprovante"
                  accept=".pdf,.png,.jpg,.jpeg"
                  required
                  onChange={(e) => setArquivo(e.target.files[0]?.name || '')}
                />
              </label>
            </div>

            {/* Aviso de Segurança (Usando o tom dourado/âmbar da paleta) */}
            <div className="security-notice">
              <i className="ph ph-lock-simple"></i>
              <p><strong>Documento Seguro:</strong> Seu comprovante é 100% privado e visualizado apenas pela moderação para confirmação do CEP.</p>
            </div>

            {/* Botão de Envio */}
            <button type="submit" className="btn-primary btn-block">
              Enviar para Análise <i className="ph ph-check-circle"></i>
            </button>

          </form>
        </section>
      </main>

      <footer className="site-footer">
        <p>Entrelace - Protótipo Acadêmico de Front-End (Sem Back-end)</p>
      </footer>
    </>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Header.css'

/**
 * Cabeçalho compartilhado.
 * - Na home (`variant="home"`) os links de âncora navegam dentro da própria página.
 * - Nas demais páginas, apontam de volta para a home com a âncora correspondente,
 *   e o último item vira "Voltar ao site".
 */
export default function Header({ variant = 'inner', ctaLabel = 'Compre a Sua' }) {
  const isHome = variant === 'home'
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header>
      <div className="menu">
        <div className="logo">Bengala Supersônica</div>

        <nav>
          {isHome ? (
            <>
              <a href="#sobre">Sobre</a>
              <a href="#vantagens">Vantagens</a>
              <a href="#galeria">Galeria</a>
              <a href="#patrocinio">Patrocínio</a>
              <a href="#inscricao">{ctaLabel}</a>
            </>
          ) : (
            <>
              <Link to="/#sobre">Sobre</Link>
              <Link to="/#vantagens">Vantagens</Link>
              <Link to="/#galeria">Galeria</Link>
              <Link to="/#patrocinio">Patrocínio</Link>
              <Link to="/">Voltar ao site</Link>
            </>
          )}
        </nav>

        <div className="header-menu">
          <button
            type="button"
            className="header-menu-btn"
            aria-haspopup="true"
            aria-expanded={menuAberto}
            aria-label="Abrir menu"
            onClick={() => setMenuAberto((aberto) => !aberto)}
          >
            <span />
            <span />
            <span />
          </button>

          {menuAberto && (
            <div className="header-menu-dropdown">
              <Link to="/historia" onClick={() => setMenuAberto(false)}>
                A história do projeto
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
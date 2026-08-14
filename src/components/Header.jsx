import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme.js'

/**
 * Cabeçalho compartilhado.
 * - Na home (`variant="home"`) os links de âncora navegam dentro da própria página.
 * - Nas demais páginas, apontam de volta para a home com a âncora correspondente,
 *   e o último item vira "Voltar ao site".
 * - Todas as opções ficam dentro do menu hambúrguer, fixo no canto superior
 *   direito da tela em qualquer tamanho de dispositivo.
 * - Ao lado, um botão fixo alterna entre tema claro e escuro em todo o site.
 */
export default function Header({ variant = 'inner', ctaLabel = 'Compre a Sua' }) {
  const isHome = variant === 'home'
  const [aberto, setAberto] = useState(false)
  const { tema, alternarTema } = useTheme()

  function fechar() {
    setAberto(false)
  }

  return (
    <header>
      <div className="menu">
        <div className="logo">Bengala Supersônica</div>

        <button
          className="tema-toggle"
          onClick={alternarTema}
          aria-label={tema === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          title={tema === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
        >
          {tema === 'dark' ? '☀' : '☾'}
        </button>

        <button
          className={`menu-toggle ${aberto ? 'menu-toggle--aberto' : ''}`}
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-controls="menu-nav"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav id="menu-nav" className={aberto ? 'nav--aberto' : ''}>
          {isHome ? (
            <>
              <a href="#sobre" onClick={fechar}>Sobre</a>
              <a href="#vantagens" onClick={fechar}>Vantagens</a>
              <a href="#galeria" onClick={fechar}>Galeria</a>
              <Link to="/historia" onClick={fechar}>História</Link>
              <a href="#patrocinio" onClick={fechar}>Patrocínio</a>
              <a href="#inscricao" onClick={fechar}>{ctaLabel}</a>
            </>
          ) : (
            <>
              <Link to="/#sobre" onClick={fechar}>Sobre</Link>
              <Link to="/#vantagens" onClick={fechar}>Vantagens</Link>
              <Link to="/#galeria" onClick={fechar}>Galeria</Link>
              <Link to="/historia" onClick={fechar}>História</Link>
              <Link to="/#patrocinio" onClick={fechar}>Patrocínio</Link>
              <Link to="/" onClick={fechar}>Voltar ao site</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
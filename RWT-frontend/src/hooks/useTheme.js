import { useEffect, useState } from 'react'

const CHAVE_ARMAZENAMENTO = 'bengala-tema'

function obterTemaInicial() {
  if (typeof window === 'undefined') return 'light'

  const salvo = window.localStorage.getItem(CHAVE_ARMAZENAMENTO)
  if (salvo === 'light' || salvo === 'dark') return salvo

  const prefereEscuro =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefereEscuro ? 'dark' : 'light'
}

/**
 * Controla o tema claro/escuro do site inteiro.
 * Aplica o atributo `data-theme` no <html> (usado pelas variáveis CSS)
 * e guarda a preferência no localStorage para persistir entre páginas e visitas.
 */
export function useTheme() {
  const [tema, setTema] = useState(obterTemaInicial)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema)
    window.localStorage.setItem(CHAVE_ARMAZENAMENTO, tema)
  }, [tema])

  function alternarTema() {
    setTema((atual) => (atual === 'dark' ? 'light' : 'dark'))
  }

  return { tema, alternarTema }
}
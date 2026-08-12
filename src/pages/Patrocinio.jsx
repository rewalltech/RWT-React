import { useEffect, useRef, useState } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/Patrocinio.css'

export default function Patrocinio() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [tipo, setTipo] = useState('')
  const [valor, setValor] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [termos, setTermos] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const modalRef = useRef(null)
  const [modalAberto, setModalAberto] = useState(false)

  useEffect(() => {
    const modal = modalRef.current
    if (!modal) return
    if (modalAberto && !modal.open) modal.showModal()
    if (!modalAberto && modal.open) modal.close()
  }, [modalAberto])

  const valorNumerico = (() => {
    const limpo = valor.replace(/[^\d,.]/g, '').replace(',', '.')
    const numero = parseFloat(limpo)
    return Number.isNaN(numero) ? null : numero
  })()

  const valorValido = valorNumerico !== null && valorNumerico >= 100
  const valorTocado = valor.trim().length > 0
  const valorEmErro = valorTocado && !valorValido

  const formularioValido =
    nome.trim() && email.trim() && tipo && mensagem.trim() && termos && valorValido

  function enviarProposta(e) {
    e.preventDefault()
    if (!formularioValido) return
    setEnviado(true)
  }

  return (
    <>
      <Header />

      <div className="patrocinio-page">
        {!enviado ? (
          <div className={`container ${valorEmErro ? 'erro' : ''}`}>
            <h1>Formulário de Patrocínio</h1>
            <p>Preencha os dados abaixo para enviar sua proposta de patrocínio.</p>

            <form onSubmit={enviarProposta}>
              <div className="field-group">
                <label htmlFor="nome">Nome do patrocinador</label>
                <input
                  type="text"
                  id="nome"
                  placeholder="Seu nome ou empresa"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="field-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="field-group">
                <label htmlFor="telefone">Telefone</label>
                <input
                  type="tel"
                  id="telefone"
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>

              <div className="field-group">
                <label htmlFor="tipo">Tipo de patrocínio</label>
                <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                  <option value="">Selecione uma opção</option>
                  <option value="financeiro">Financeiro</option>
                  <option value="produtos">Produtos</option>
                  <option value="servicos">Serviços</option>
                  <option value="midia">Mídia/Divulgação</option>
                </select>
              </div>

              <div className={`field-group valor-group ${valorEmErro ? 'erro' : ''}`}>
                <label htmlFor="valor">Valor estimado ou contribuição (mínimo R$ 100,00)</label>
                <input
                  type="text"
                  id="valor"
                  placeholder="R$ 100,00"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
                <small className="erro-mensagem" style={{ display: valorEmErro ? 'block' : 'none' }}>
                  O valor mínimo é R$ 100,00
                </small>
              </div>

              <div className="field-group">
                <label htmlFor="mensagem">Mensagem ou proposta</label>
                <textarea
                  id="mensagem"
                  placeholder="Descreva sua proposta de patrocínio"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="field-group">
                <label className="checkbox-linha" htmlFor="termos">
                  <input
                    type="checkbox"
                    id="termos"
                    checked={termos}
                    onChange={(e) => setTermos(e.target.checked)}
                    required
                  />
                  <span>
                    Li e concordo com os{' '}
                    <button type="button" className="link-termos" onClick={() => setModalAberto(true)}>
                      termos de patrocínio
                    </button>.
                  </span>
                </label>
              </div>

              <div className="actions">
                <button type="submit" disabled={!formularioValido}>
                  Enviar proposta
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="container">
            <h1>Proposta enviada!</h1>
            <p>
              Obrigado pelo interesse em apoiar a Bengala Supersônica. Nossa equipe vai analisar sua
              proposta e entrar em contato em breve.
            </p>
          </div>
        )}
      </div>

      <Footer />

      <dialog
        id="modalTermos"
        ref={modalRef}
        onClose={() => setModalAberto(false)}
        onClick={(e) => {
          if (e.target === modalRef.current) setModalAberto(false)
        }}
      >
        <h2>Termos de patrocínio</h2>
        <div className="modal-conteudo">
          Ao patrocinar a Bengala Supersônica, você apoia uma equipe de estudantes no
          desenvolvimento de um protótipo de acessibilidade. As contribuições são usadas para
          componentes, materiais e apresentação do projeto em feiras de ciência. Entraremos em
          contato para combinar os detalhes da sua proposta.
        </div>
        <button type="button" id="fecharModal" onClick={() => setModalAberto(false)}>
          Fechar
        </button>
      </dialog>
    </>
  )
}

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

  const [modalAberto, setModalAberto] = useState(false)
  const [termosRolados, setTermosRolados] = useState(false)
  const [aceitouTermos, setAceitouTermos] = useState(false)

  const modalRef = useRef(null)

  // =========================
  // CONTROLE DO MODAL
  // =========================

  useEffect(() => {
    const modal = modalRef.current

    if (!modal) return

    if (modalAberto && !modal.open) {
      modal.showModal()
    }

    if (!modalAberto && modal.open) {
      modal.close()
    }
  }, [modalAberto])

  // =========================
  // VALIDAÇÃO DO E-MAIL
  // =========================

  const emailValido =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

  const emailTocado =
    email.trim().length > 0

  const emailEmErro =
    emailTocado && !emailValido

  // =========================
  // TELEFONE
  // =========================

  function formatarTelefone(valorDigitado) {
    const numeros = valorDigitado
      .replace(/\D/g, '')
      .slice(0, 11)

    if (numeros.length === 0) {
      return ''
    }

    if (numeros.length <= 2) {
      return `(${numeros}`
    }

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`
  }

  function alterarTelefone(e) {
    setTelefone(formatarTelefone(e.target.value))
  }

  // =========================
  // VALOR
  // =========================

  const valorNumerico = (() => {
    const limpo = valor
      .replace(/[^\d,.]/g, '')
      .replace(',', '.')

    const numero = parseFloat(limpo)

    return Number.isNaN(numero)
      ? null
      : numero
  })()

  const valorValido =
    valorNumerico !== null &&
    valorNumerico >= 100

  const valorTocado =
    valor.trim().length > 0

  const valorEmErro =
    valorTocado && !valorValido

  // =========================
  // FORMULÁRIO
  // =========================

  const formularioValido =
    nome.trim() &&
    emailValido &&
    tipo &&
    mensagem.trim() &&
    termos &&
    valorValido

  function enviarProposta(e) {
    e.preventDefault()

    if (!formularioValido) {
      return
    }

    setEnviado(true)
  }

  // =========================
  // ROLAGEM DOS TERMOS
  // =========================

  function verificarRolagem(e) {
    const elemento = e.currentTarget

    const chegouAoFinal =
      elemento.scrollTop +
        elemento.clientHeight >=
      elemento.scrollHeight - 5

    if (chegouAoFinal) {
      setTermosRolados(true)
    }
  }

  // =========================
  // ABRIR TERMOS
  // =========================

  function abrirTermos() {
    setTermosRolados(false)
    setAceitouTermos(false)
    setModalAberto(true)
  }

  // =========================
  // ACEITAR TERMOS
  // =========================

  function aceitarTermos() {
    setTermos(true)
    setAceitouTermos(false)
    setTermosRolados(false)
    setModalAberto(false)
  }

  // =========================
  // JSX
  // =========================

  return (
    <>
      <Header />

      <div className="patrocinio-page">

        {!enviado ? (

          <div
            className={`container ${
              valorEmErro ? 'erro' : ''
            }`}
          >

            <h1>
              Formulário de Patrocínio
            </h1>

            <p>
              Preencha os dados abaixo para enviar
              sua proposta de patrocínio.
            </p>

            <form onSubmit={enviarProposta}>

              {/* NOME */}

              <div className="field-group">

                <label htmlFor="nome">
                  Nome do patrocinador
                </label>

                <input
                  type="text"
                  id="nome"
                  placeholder="Seu nome ou empresa"
                  value={nome}
                  onChange={(e) =>
                    setNome(e.target.value)
                  }
                  required
                />

              </div>

              {/* E-MAIL */}

              <div
                className={`field-group ${
                  emailEmErro
                    ? 'campo-erro'
                    : ''
                }`}
              >

                <label htmlFor="email">
                  E-mail
                </label>

                <input
                  type="email"
                  id="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

                {emailEmErro && (
                  <small className="erro-mensagem">
                    Digite um e-mail válido.
                  </small>
                )}

              </div>

              {/* TELEFONE */}

              <div className="field-group">

                <label htmlFor="telefone">
                  Telefone
                </label>

                <input
                  type="tel"
                  id="telefone"
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  onChange={alterarTelefone}
                  maxLength={15}
                />

              </div>

              {/* TIPO DE PATROCÍNIO */}

              <div className="field-group">

                <label htmlFor="tipo">
                  Tipo de patrocínio
                </label>

                <select
                  id="tipo"
                  value={tipo}
                  onChange={(e) =>
                    setTipo(e.target.value)
                  }
                  required
                >

                  <option value="">
                    Selecione uma opção
                  </option>

                  <option value="financeiro">
                    Financeiro
                  </option>

                  <option value="produtos">
                    Produtos
                  </option>

                  <option value="servicos">
                    Serviços
                  </option>

                  <option value="midia">
                    Mídia/Divulgação
                  </option>

                </select>

              </div>

              {/* VALOR */}

              <div
                className={`field-group valor-group ${
                  valorEmErro ? 'erro' : ''
                }`}
              >

                <label htmlFor="valor">
                  Valor estimado ou contribuição
                  (mínimo R$ 100,00)
                </label>

                <input
                  type="text"
                  id="valor"
                  placeholder="R$ 100,00"
                  value={valor}
                  onChange={(e) =>
                    setValor(e.target.value)
                  }
                />

                {valorEmErro && (
                  <small className="erro-mensagem">
                    O valor mínimo é R$ 100,00
                  </small>
                )}

              </div>

              {/* MENSAGEM */}

              <div className="field-group">

                <label htmlFor="mensagem">
                  Mensagem ou proposta
                </label>

                <textarea
                  id="mensagem"
                  placeholder="Descreva sua proposta de patrocínio"
                  value={mensagem}
                  onChange={(e) =>
                    setMensagem(e.target.value)
                  }
                  required
                />

              </div>

              {/* TERMOS */}

              <div className="field-group">

                <label
                  className="checkbox-linha"
                  htmlFor="termos"
                >

                  <input
                    type="checkbox"
                    id="termos"
                    checked={termos}
                    onChange={(e) =>
                      setTermos(e.target.checked)
                    }
                    required
                  />

                  <span>
                    Li e concordo com os{' '}

                    <button
                      type="button"
                      className="link-termos"
                      onClick={abrirTermos}
                    >
                      termos de patrocínio
                    </button>.
                  </span>

                </label>

              </div>

              {/* BOTÃO ENVIAR */}

              <div className="actions">

                <button
                  type="submit"
                  disabled={!formularioValido}
                >
                  Enviar proposta
                </button>

              </div>

            </form>

          </div>

        ) : (

          <div className="container">

            <h1>
              Proposta enviada!
            </h1>

            <p>
              Obrigado pelo interesse em apoiar
              a Bengala Supersônica. Nossa equipe
              vai analisar sua proposta e entrar
              em contato em breve.
            </p>

          </div>

        )}

      </div>

      <Footer />

      {/* =========================
          MODAL DOS TERMOS
      ========================= */}

      <dialog
        id="modalTermos"
        ref={modalRef}
        onCancel={(e) => {
          e.preventDefault()
        }}
      >

        <h2>
          Termos de patrocínio
        </h2>

        <div
          className="modal-conteudo"
          onScroll={verificarRolagem}
        >

          <p>
            Ao patrocinar a Bengala Supersônica,
            você apoia uma equipe de estudantes
            no desenvolvimento de um protótipo
            de acessibilidade.
          </p>

          <p>
            As contribuições são utilizadas para
            componentes, materiais e apresentação
            do projeto em feiras de ciência.
          </p>

          <p>
            O patrocinador poderá entrar em contato
            com a equipe para esclarecer dúvidas e
            combinar os detalhes da contribuição.
          </p>

          <p>
            A participação como patrocinador representa
            uma forma de apoio ao desenvolvimento do
            projeto e à divulgação da tecnologia assistiva.
          </p>

          <p>
            Ao aceitar estes termos, você declara estar
            de acordo com as condições apresentadas
            neste formulário.
          </p>

          <p>
            Estes termos devem ser lidos integralmente
            antes da confirmação do patrocínio.
          </p>

          <p>
            Obrigado por apoiar o projeto
            Bengala Supersônica.
          </p>

        </div>

        {/* CHECKBOX DOS TERMOS */}

        <div className="aceite-termos">

          <label>

            <input
              type="checkbox"
              disabled={!termosRolados}
              checked={aceitouTermos}
              onChange={(e) =>
                setAceitouTermos(
                  e.target.checked
                )
              }
            />

            <span>
              Li e aceito os termos.
            </span>

          </label>

        </div>

        {/* AVISO */}

        {!termosRolados && (

          <p className="aviso-termos">
            Role até o final dos termos
            para continuar.
          </p>

        )}

        {/* BOTÃO ACEITO */}

        <button
          type="button"
          id="fecharModal"
          disabled={!aceitouTermos}
          onClick={aceitarTermos}
        >
          Aceito
        </button>

      </dialog>
    </>
  )
}
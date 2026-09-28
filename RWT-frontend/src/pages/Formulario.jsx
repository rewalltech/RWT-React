import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { emailValido, formatarTelefone, formatarCep, montarEndereco } from '../hooks/validacao.js'
import { buscarCep } from '../services/viacep.js'
import '../styles/Formulario.css'

const API_URL = '/api/pedido'

const CAMPOS_OBRIGATORIOS = [
  'nome', 'telefone', 'email',
  'cep', 'logradouro', 'numero', 'bairro', 'cidade', 'uf',
  'altura', 'mao',
]

const VALORES_INICIAIS = {
  nome: '',
  telefone: '',
  email: '',
  cep: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  uf: '',
  altura: '',
  mao: '',
  mensagem: '',
}

// O backend guarda o endereço em um único campo de texto,
// então os campos separados do formulário são juntados antes de enviar.
function montarPedido(dados) {
  return {
    nome: dados.nome,
    telefone: dados.telefone,
    email: dados.email,
    endereco: montarEndereco(dados),
    altura: dados.altura,
    mao: dados.mao,
    mensagem: dados.mensagem,
  }
}

export default function Formulario() {
  const [dados, setDados] = useState(VALORES_INICIAIS)
  const [erros, setErros] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [sucesso, setSucesso] = useState(false)
  const [avisoOffline, setAvisoOffline] = useState(false)
  const [buscandoCep, setBuscandoCep] = useState(false)
  const [cepEncontrado, setCepEncontrado] = useState(false)
  const buscaAtual = useRef(0)

  function atualizarCampo(campo, valor) {
    setDados((atual) => ({ ...atual, [campo]: valor }))
    setErros((atual) => ({ ...atual, [campo]: '' }))
  }

  async function aoDigitarCep(valor) {
    const cep = formatarCep(valor)
    atualizarCampo('cep', cep)

    // qualquer mudança no CEP invalida a busca anterior
    const idBusca = ++buscaAtual.current
    setCepEncontrado(false)

    if (cep.length < 9) {
      setBuscandoCep(false)
      return
    }

    setBuscandoCep(true)

    try {
      const endereco = await buscarCep(cep)
      if (idBusca !== buscaAtual.current) return // o usuário já digitou outro CEP

      if (!endereco) {
        setErros((atual) => ({ ...atual, cep: 'CEP não encontrado. Confira os números ou preencha o endereço abaixo.' }))
        return
      }

      setDados((atual) => ({ ...atual, ...endereco }))
      setErros((atual) => ({ ...atual, logradouro: '', bairro: '', cidade: '', uf: '' }))
      setCepEncontrado(true)
    } catch (erro) {
      if (idBusca !== buscaAtual.current) return
      setErros((atual) => ({ ...atual, cep: 'Não deu pra consultar o CEP agora. Preencha o endereço abaixo.' }))
      console.warn('[formulario] falha ao consultar ViaCEP:', erro)
    } finally {
      if (idBusca === buscaAtual.current) setBuscandoCep(false)
    }
  }

  function validarCepAoSair() {
    if (dados.cep && dados.cep.length < 9 && !erros.cep) {
      setErros((atual) => ({ ...atual, cep: 'O CEP tem 8 números.' }))
    }
  }

  function validarEmailAoSair() {
    const valor = dados.email.trim()
    if (!valor) return
    if (!emailValido(valor)) {
      setErros((atual) => ({ ...atual, email: 'Informe um e-mail válido (com @ e domínio).' }))
    }
  }

  function validar() {
    const novosErros = {}

    CAMPOS_OBRIGATORIOS.forEach((campo) => {
      if (!dados[campo] || !dados[campo].trim()) {
        novosErros[campo] = 'Preencha este campo.'
      }
    })

    if (dados.cep && dados.cep.length < 9 && !novosErros.cep) {
      novosErros.cep = 'O CEP tem 8 números.'
    }

    if (dados.email && dados.email.trim() && !novosErros.email) {
      if (!emailValido(dados.email)) {
        novosErros.email = 'Informe um e-mail válido (com @ e domínio).'
      }
    }

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  async function enviarPedido(evento) {
    evento.preventDefault()
    setAvisoOffline(false)

    if (!validar()) return

    setEnviando(true)

    try {
      const controller = typeof AbortController === 'function' ? new AbortController() : null
      const timeoutId = controller ? window.setTimeout(() => controller.abort(), 12000) : null

      const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(montarPedido(dados)),
        signal: controller ? controller.signal : undefined,
      })

      if (timeoutId) window.clearTimeout(timeoutId)
      if (!resposta.ok) throw new Error('Resposta da API com status ' + resposta.status)

      setEnviando(false)
      setSucesso(true)
    } catch (erro) {
      setEnviando(false)
      setAvisoOffline(true)
      console.warn('[formulario] falha ao enviar pedido:', erro)
    }
  }

  return (
    <>
      <Header />

      <section className="form-hero">
        <div className="form-hero-content">
          <span className="form-eyebrow">Pedido</span>

          <h1>
            Vamos montar a <span>sua</span> Bengala Supersônica
          </h1>

          <p>Leva menos de 2 minutos. Depois disso, é só aguardar nosso contato para combinar a entrega.</p>

          <div className="form-specs">
            <div className="form-spec">
              <strong>Sensor</strong>
              <span>Obstáculos à frente</span>
            </div>
            <div className="form-spec">
              <strong>Estrutura</strong>
              <span>Leve e resistente</span>
            </div>
            <div className="form-spec">
              <strong>Unidades</strong>
              <span>Feitas sob encomenda</span>
            </div>
          </div>
        </div>
      </section>

      <section className="form-section">
        {!sucesso ? (
          <form className="form-card" noValidate onSubmit={enviarPedido}>
            <div className="form-tag">PEDIDO · 01</div>

            <div className="form-bloco">
              <div className="form-bloco-titulo">
                <span className="form-no">01</span>
                <h2>Quem é você</h2>
              </div>

              <div className="form-grupo">
                <label htmlFor="nome">Nome completo</label>
                <input
                  type="text"
                  id="nome"
                  className={erros.nome ? 'form-invalido' : ''}
                  placeholder="Como podemos te chamar?"
                  value={dados.nome}
                  onChange={(e) => atualizarCampo('nome', e.target.value)}
                />
                <span className="form-erro">{erros.nome}</span>
              </div>

              <div className="form-linha">
                <div className="form-grupo">
                  <label htmlFor="telefone">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    id="telefone"
                    className={erros.telefone ? 'form-invalido' : ''}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    value={dados.telefone}
                    onChange={(e) => atualizarCampo('telefone', formatarTelefone(e.target.value))}
                  />
                  <span className="form-erro">{erros.telefone}</span>
                </div>

                <div className="form-grupo">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    className={erros.email ? 'form-invalido' : ''}
                    placeholder="voce@email.com"
                    value={dados.email}
                    onChange={(e) => atualizarCampo('email', e.target.value)}
                    onBlur={validarEmailAoSair}
                  />
                  <span className="form-erro">{erros.email}</span>
                </div>
              </div>
            </div>

            <div className="form-trilha" aria-hidden="true"><span></span></div>

            <div className="form-bloco">
              <div className="form-bloco-titulo">
                <span className="form-no">02</span>
                <h2>Para onde entregar</h2>
              </div>

              <div className="form-grupo">
                <label htmlFor="cep">CEP</label>
                <input
                  type="text"
                  id="cep"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  className={erros.cep ? 'form-invalido' : ''}
                  placeholder="00000-000"
                  maxLength={9}
                  value={dados.cep}
                  onChange={(e) => aoDigitarCep(e.target.value)}
                  onBlur={validarCepAoSair}
                />
                <span className={`form-erro ${buscandoCep || cepEncontrado ? 'form-info' : ''}`}>
                  {buscandoCep ? 'Buscando endereço...' : erros.cep || (cepEncontrado ? 'Endereço encontrado ✓' : '')}
                </span>
              </div>

              <div className="form-grupo">
                <label htmlFor="logradouro">Rua</label>
                <input
                  type="text"
                  id="logradouro"
                  autoComplete="address-line1"
                  className={erros.logradouro ? 'form-invalido' : ''}
                  placeholder="Preenchida automaticamente pelo CEP"
                  value={dados.logradouro}
                  onChange={(e) => atualizarCampo('logradouro', e.target.value)}
                />
                <span className="form-erro">{erros.logradouro}</span>
              </div>

              <div className="form-linha">
                <div className="form-grupo">
                  <label htmlFor="numero">Número da casa</label>
                  <input
                    type="text"
                    id="numero"
                    className={erros.numero ? 'form-invalido' : ''}
                    placeholder="Ex.: 120 ou S/N"
                    value={dados.numero}
                    onChange={(e) => atualizarCampo('numero', e.target.value)}
                  />
                  <span className="form-erro">{erros.numero}</span>
                </div>

                <div className="form-grupo">
                  <label htmlFor="complemento">Complemento <span className="form-opcional">opcional</span></label>
                  <input
                    type="text"
                    id="complemento"
                    autoComplete="address-line2"
                    placeholder="Apto, bloco, referência..."
                    value={dados.complemento}
                    onChange={(e) => atualizarCampo('complemento', e.target.value)}
                  />
                  <span className="form-erro"></span>
                </div>
              </div>

              <div className="form-grupo">
                <label htmlFor="bairro">Bairro</label>
                <input
                  type="text"
                  id="bairro"
                  className={erros.bairro ? 'form-invalido' : ''}
                  placeholder="Preenchido automaticamente pelo CEP"
                  value={dados.bairro}
                  onChange={(e) => atualizarCampo('bairro', e.target.value)}
                />
                <span className="form-erro">{erros.bairro}</span>
              </div>

              <div className="form-linha form-linha--cidade">
                <div className="form-grupo">
                  <label htmlFor="cidade">Cidade</label>
                  <input
                    type="text"
                    id="cidade"
                    className={erros.cidade ? 'form-invalido' : ''}
                    placeholder="Ex.: Santa Maria"
                    readOnly={cepEncontrado}
                    value={dados.cidade}
                    onChange={(e) => atualizarCampo('cidade', e.target.value)}
                  />
                  <span className="form-erro">{erros.cidade}</span>
                </div>

                <div className="form-grupo">
                  <label htmlFor="estado">Estado</label>
                  <input
                    type="text"
                    id="estado"
                    maxLength={2}
                    className={erros.uf ? 'form-invalido' : ''}
                    placeholder="RS"
                    readOnly={cepEncontrado}
                    value={dados.uf}
                    onChange={(e) => atualizarCampo('uf', e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                  />
                  <span className="form-erro">{erros.uf}</span>
                </div>
              </div>
            </div>

            <div className="form-trilha" aria-hidden="true"><span></span></div>

            <div className="form-bloco">
              <div className="form-bloco-titulo">
                <span className="form-no">03</span>
                <h2>Um ajuste fino</h2>
              </div>

              <div className="form-grupo">
                <label htmlFor="altura">Altura aproximada</label>
                <div className="form-select">
                  <select
                    id="altura"
                    className={erros.altura ? 'form-invalido' : ''}
                    value={dados.altura}
                    onChange={(e) => atualizarCampo('altura', e.target.value)}
                  >
                    <option value="" disabled>Selecione uma faixa</option>
                    <option value="ate-1.60">Até 1,60 m</option>
                    <option value="1.61-1.75">1,61 m — 1,75 m</option>
                    <option value="1.76-1.90">1,76 m — 1,90 m</option>
                    <option value="acima-1.90">Acima de 1,90 m</option>
                  </select>
                </div>
                <span className="form-erro">{erros.altura}</span>
              </div>

              <div className="form-grupo">
                <label>Mão de apoio preferida</label>

                <div className="form-dip" role="radiogroup" aria-label="Mão de apoio preferida">
                  {[
                    { valor: 'direita', rotulo: 'Direita' },
                    { valor: 'esquerda', rotulo: 'Esquerda' },
                    { valor: 'indiferente', rotulo: 'Indiferente' },
                  ].map((opcao) => (
                    <div key={opcao.valor}>
                      <input
                        type="radio"
                        id={`mao-${opcao.valor}`}
                        name="mao"
                        value={opcao.valor}
                        checked={dados.mao === opcao.valor}
                        onChange={(e) => atualizarCampo('mao', e.target.value)}
                      />
                      <label className="form-dip-opcao" htmlFor={`mao-${opcao.valor}`}>
                        <span className="form-dip-chave"></span>
                        {opcao.rotulo}
                      </label>
                    </div>
                  ))}
                </div>

                <span className="form-erro" id="erro-mao">{erros.mao}</span>
              </div>
            </div>

            <div className="form-trilha" aria-hidden="true"><span></span></div>

            <div className="form-bloco">
              <div className="form-bloco-titulo">
                <span className="form-no">04</span>
                <h2>Algo mais? <span className="form-opcional">opcional</span></h2>
              </div>

              <div className="form-grupo">
                <label htmlFor="mensagem">Necessidade específica</label>
                <textarea
                  id="mensagem"
                  rows="4"
                  placeholder="Conte pra gente se você precisa de algum ajuste especial"
                  value={dados.mensagem}
                  onChange={(e) => atualizarCampo('mensagem', e.target.value)}
                ></textarea>
              </div>
            </div>

            <button type="submit" className="btn form-btn" disabled={enviando}>
              {enviando ? 'Enviando...' : 'Enviar pedido'}
            </button>

            <p className="form-privacidade">
              Seus dados são usados só para tratar do seu pedido. Nada de spam, nada de terceiros.
            </p>
          </form>
        ) : (
          <div className="form-sucesso form-sucesso--visivel">
            <div className="form-sucesso-icone">✓</div>
            <h3>Pedido recebido!</h3>
            <p>
              Obrigado! Nossa equipe vai entrar em contato em breve pelo telefone ou e-mail informado
              para confirmar os próximos passos.
            </p>
            <Link to="/" className="btn">Voltar ao site</Link>
          </div>
        )}
      </section>

      <Footer />

      <div className={`form-offline-aviso ${avisoOffline ? 'form-offline-aviso--visivel' : ''}`}>
        Não foi possível enviar pelo site agora. Você pode falar direto com a gente pelo{' '}
        <a href="https://wa.me/5555991697926" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        {' '}ou por{' '}
        <a href="mailto:rewalltech@gmail.com?subject=Contato pelo site&body=Olá!">e-mail</a>
      </div>
    </>
  )
}
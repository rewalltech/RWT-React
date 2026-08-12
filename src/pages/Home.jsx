import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/Home.css'

export default function Home() {
  return (
    <>
      <Header variant="home" />

      <section className="hero">
        <div className="hero-content">
          <h1>
            Ande mais rápido com a <span>Bengala Supersônica</span>
          </h1>

          <p>
            Chega de caminhar sem ter noção do que está à sua volta. A Bengala Supersônica foi
            criada para quem não abre mão de estilo, segurança e confiança. Tecnologia de ponta
            encontra tradição em um só acessório.
          </p>

          <Link to="/pedido" className="btn">
            Quero a minha
          </Link>
        </div>
      </section>

      <section id="sobre">
        <h2 className="titulo">Por que ter uma Bengala Supersônica?</h2>

        <div className="cards">
          <div className="card">
            <h3>Segurança</h3>
            <p>
              Com a possibilidade de detectar obstáculos à frente, a bengala permite que você
              caminhe com confiança e segurança, evitando acidentes e quedas.
            </p>
          </div>

          <div className="card">
            <h3>Design</h3>
            <p>
              Sem fugir muito da bengala tradicional, foi desenhada para ser eficiente e elegante,
              com um visual moderno e sofisticado que combina com qualquer estilo.
            </p>
          </div>

          <div className="card">
            <h3>Velocidade Contínua</h3>
            <p>
              Ganhe ritmo aos poucos até atingir sua velocidade de cruzeiro ideal, com total
              controle e segurança a cada passo.
            </p>
          </div>
        </div>
      </section>

      <section id="vantagens">
        <h2 className="titulo">O que você vai encontrar</h2>

        <div className="cards">
          <div className="card">
            <h3>Estrutura leve</h3>
            <p>Estrutura leve, sem precisar de muito esforço para usar.</p>
          </div>

          <div className="card">
            <h3>Painel de Controle</h3>
            <p>Botões de controle simples e fáceis de usar.</p>
          </div>

          <div className="card">
            <h3>Acessórios</h3>
            <p>Em breve!</p>
          </div>
        </div>
      </section>

      <section id="galeria">
        <h2 className="titulo titulo--com-acao">O projeto em construção</h2>

        <h2 className="titulo titulo--com-acao">O projeto em construção</h2>

       <div className="titulo-acao">
          <Link to="/galeria" className="btn">
            Ver galeria completa
           </Link>
       </div>

       <div className="titulo titulo--com-acao">
          <Link to="/galeria" className="btn">
            Ver galeria completa
           </Link>
       </div>

        <div className="galeria-grid">
          <figure className="galeria-item galeria-item--grande">
            <img
              src="/imagem1.png"
              alt="Bancada de montagem com componentes eletrônicos, protoboard e ferramentas de solda usados no desenvolvimento da bengala."
            />
            <figcaption>Bancada de desenvolvimento: protoboard, sensores e ferramentas de solda</figcaption>
          </figure>

          <figure className="galeria-item">
            <img
              src="/imagem2.png"
              alt="Protótipo montado da bengala com módulos eletrônicos, fiação e bateria acoplados ao cabo."
            />
            <figcaption>Protótipo funcional com módulos e bateria acoplados</figcaption>
          </figure>

          <figure className="galeria-item">
            <img
              src="/imagem3.png"
              alt="Equipe do projeto apresentando a bengala em uma feira de ciência e tecnologia jovem, com o protótipo em exibição no palco."
            />
            <figcaption>Apresentação do projeto na Feira de Ciência e Tecnologia Jovem</figcaption>
          </figure>
        </div>
      </section>

      <section id="patrocinio" className="patrocinio">
        <div className="patrocinio-content">
          <h2 className="titulo">Ajude este projeto a ir mais longe</h2>

          <p>
            Somos uma equipe de estudantes desenvolvendo esta tecnologia do protótipo à
            apresentação em feiras de ciência. Com o apoio de patrocinadores, podemos melhorar os
            componentes, aperfeiçoar o design e levar o projeto para mais pessoas.
          </p>

          <Link to="/patrocinio" className="btn">
            Quero ser patrocinador
          </Link>
        </div>
      </section>

      <section className="cta" id="inscricao">
        <h2>Garanta a sua Bengala Supersônica</h2>

        <p>Dê o próximo passo — literalmente. Clique no botão abaixo e faça seu pedido.</p>

        <Link to="/pedido" className="btn">
          Comprar agora
        </Link>
      </section>

      <Footer />
    </>
  )
}
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/Historia.css'

export default function Historia() {
  return (
    <>
      <Header variant="historia" />

      <div className="jornal">
        <div className="jornal-masthead">
          <p className="jornal-data">Santa Maria, RS — Edição especial</p>
          <h1 className="jornal-titulo-principal">Bengala Supersônica</h1>
          <p className="jornal-subtitulo">
            Diário do Projeto · EEEM Professora Naura Teixeira Pinheiro
          </p>
          <div className="jornal-linha-dupla" />
        </div>

        <article className="jornal-materia">
          <p className="jornal-kicker">Reportagem especial</p>
          <h2 className="jornal-manchete">
            De um robô inspirado em Wall-E a uma bengala que enxerga por sensores
          </h2>
          <p className="jornal-linha-fina">
            Como um grupo de estudantes de Santa Maria transformou tentativas e erros em uma
            solução de acessibilidade
          </p>

          <div className="jornal-corpo">
            <figure className="jornal-foto">
              <img src="/equipe-robotica.jpg" alt="Equipe do projeto reunida com notebooks durante uma aula de robótica" />
              <figcaption>A equipe durante uma das aulas de robótica no turno inverso — Foto: acervo pessoal</figcaption>
            </figure>

            <div className="jornal-texto">
              <h3 className="jornal-subtitulo-secao">Onde tudo começou</h3>
              <p>
                <span className="capitular">O</span>projeto nasceu nas aulas de robótica do turno
                inverso da EEEM Professora Naura Teixeira Pinheiro, em Santa Maria (RS),
                oferecidas uma vez por semana como parte do projeto JET (Jovem e Tecnologia), do
                curso de Sistema de Informação da Faculdade Antônio Meneghetti. É nesse espaço,
                com notebooks, kits de robótica, hardware e uma impressora 3D, que estudantes do
                8º ano ao ensino médio colocam a mão na massa.
              </p>

              <h3 className="jornal-subtitulo-secao">Como a ideia foi tomando forma</h3>
              <p>
                Tudo começou com a ideia de criar um robô com braços capazes de pegar objetos —
                algo bem parecido com o Wall-E. Essa ideia foi ganhando corpo através de um
                carrinho controlado por controle remoto, mas o projeto esbarrou num problema
                prático: a bateria não aguentava.
              </p>
              <p>
                A equipe decidiu então acoplar um sensor ultrassônico ao carrinho, para que ele
                andasse sozinho. O sistema foi montado com cuidado, mas ainda apresentava muitos
                erros. Foi nesse momento que a professora sugeriu uma nova direção: criar um
                suporte que guiasse a pessoa junto com o carrinho, usando GPS.
              </p>

              <blockquote className="jornal-citacao">
                "A virada do projeto foi entender que os sensores não precisavam de um carrinho —
                eles podiam viver em uma bengala convencional."
              </blockquote>

              <p>
                A partir dessa conversa, surgiu a virada do projeto — usar os sensores em uma
                bengala convencional. Foi esse o ponto de partida que deu origem à Bengala
                Supersônica.
              </p>

              <h3 className="jornal-subtitulo-secao">O objetivo do projeto</h3>
              <p>
                As bengalas tradicionais detectam apenas obstáculos no nível do solo, deixando
                quem as usa vulnerável a colisões com placas, galhos e objetos suspensos acima da
                linha da cintura. A Bengala Supersônica usa sensores ultrassônicos que emitem
                ondas sonoras de alta frequência para calcular a distância até obstáculos em
                diferentes níveis, convertendo essa informação em alertas sonoros e vibratórios em
                tempo real.
              </p>
              <p>
                O objetivo é ampliar a autonomia, a segurança e a percepção espacial de pessoas
                com deficiência visual ou dificuldades de mobilidade, com uma solução de
                tecnologia assistiva de baixo custo.
              </p>

              <h3 className="jornal-subtitulo-secao">Os fundadores</h3>
              <p>
                A Bengala Supersônica é criada por um grupo de estudantes da EEEM Professora Naura
                Teixeira Pinheiro:
              </p>
              <ul className="jornal-fundadores">
                <li>Murilo</li>
                <li>Weslley</li>
                <li>Bruno</li>
                <li>Maria</li>
                <li>Emylli</li>
                <li>Tuany</li>
              </ul>

              <h3 className="jornal-subtitulo-secao">Orientação</h3>
              <p>
                O projeto conta com a orientação da Prof.ª Débora Barbosa.
              </p>
            </div>
          </div>
        </article>
      </div>

      <Footer />
    </>
  )
}
import { useEffect, useRef, useState } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/Galeria.css'

const FOTOS = [
  {
    src: '/img1.jpeg',
    alt: 'Bengala em desenvolvimento.',
    legenda: 'Bengala em desenvolvimento',
    grande: true,
  },
  {
    src: '/img2.jpeg',
    alt: 'Módulo Arduino preso ao tubo de PVC, com fiação e bateria de 9V acopladas ao cabo.',
    legenda: 'Módulo de controle e bateria acoplados ao cabo',
  },
  {
    src: '/img3.jpeg',
    alt: 'Bengala montada na vertical, mostrando os sensores ultrassônicos distribuídos ao longo do cabo.',
    legenda: 'Protótipo completo com sensores distribuídos ao longo do cabo',
  },
  {
    src: '/img4.jpeg',
    alt: 'Bancada de trabalho em etapa inicial de montagem, com módulos sendo fixados ao tubo.',
    legenda: 'Etapa inicial de montagem na bancada',
  },
  {
    src: '/img5.jpeg',
    alt: 'Detalhe da extremidade de empunhadura da bengala, com módulo de controle e conexões protegidas por fita isolante.',
    legenda: 'Detalhe da empunhadura e das conexões',
  },
  {
    src: '/img6.jpeg',
    alt: 'Equipe do projeto sendo entrevistada no palco da Feira de Ciência e Tecnologia Jovem.',
    legenda: 'Equipe entrevistada no palco do evento',
  },
  {
    src: '/img7.jpeg',
    alt: 'Vista geral do auditório com a equipe do projeto diante do telão da Feira de Ciência e Tecnologia Jovem.',
    legenda: 'Vista geral da apresentação no auditório',
  },
  {
    src: '/img8.jpeg',
    alt: 'Integrante da equipe apresentando o protótipo da bengala ao público.',
    legenda: 'Apresentação do protótipo ao público',
  },
]

export default function Galeria() {
  const [aberto, setAberto] = useState(false)
  const [atual, setAtual] = useState(0)
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (aberto && !dialog.open) dialog.showModal()
    if (!aberto && dialog.open) dialog.close()
  }, [aberto])

  function abrir(indice) {
    setAtual(indice)
    setAberto(true)
  }

  function anterior() {
    setAtual((i) => (i - 1 + FOTOS.length) % FOTOS.length)
  }

  function proxima() {
    setAtual((i) => (i + 1) % FOTOS.length)
  }

  function aoTeclar(e) {
    if (e.key === 'ArrowRight') proxima()
    if (e.key === 'ArrowLeft') anterior()
  }

  return (
    <>
      <Header />

      <section>
        <h2 className="titulo">Galeria de Imagens</h2>

        <div className="gal-grid">
          {FOTOS.map((foto, indice) => (
            <figure
              key={foto.src}
              className={`gal-item ${foto.grande ? 'gal-item--grande' : ''}`}
              onClick={() => abrir(indice)}
            >
              <img src={foto.src} alt={foto.alt} />
              <figcaption>{foto.legenda}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Footer />

      <dialog
        className="lb-dialog"
        ref={dialogRef}
        onClose={() => setAberto(false)}
        onKeyDown={aoTeclar}
        onClick={(e) => {
          if (e.target === dialogRef.current) setAberto(false)
        }}
      >
        <button className="lb-close" onClick={() => setAberto(false)} aria-label="Fechar">✕</button>
        <button className="lb-nav lb-prev" onClick={anterior} aria-label="Foto anterior">‹</button>
        <button className="lb-nav lb-next" onClick={proxima} aria-label="Próxima foto">›</button>
        <div className="lb-wrap">
          <img src={FOTOS[atual].src} alt={FOTOS[atual].alt} />
          <p className="lb-cap">{FOTOS[atual].legenda}</p>
        </div>
      </dialog>
    </>
  )
}
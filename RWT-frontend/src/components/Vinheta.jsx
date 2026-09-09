import { useEffect, useState } from 'react';
import '../styles/Vinheta.css';


export default function Vinheta({ forceShow = false, onFinish }) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const jaViu = sessionStorage.getItem('rwt-vinheta-vista');
    if (!forceShow && jaViu) {
      onFinish?.();
      return;
    }

    setVisible(true);

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const duracao = prefersReduced ? 900 : 5000;

    const timer = setTimeout(() => encerrar(), duracao);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function encerrar() {
    setClosing(true);
    sessionStorage.setItem('rwt-vinheta-vista', '1');
    setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, 500);
  }

  if (!visible) return null;

  return (
    <div
      className={`vinheta-overlay${closing ? ' vinheta-saindo' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Carregando RWT"
    >
      <div className="vinheta-marca">
        <span className="vinheta-barra vinheta-barra-r" />
        <span className="vinheta-barra vinheta-barra-w" />
        <span className="vinheta-barra vinheta-barra-t" />
      </div>

      <p className="vinheta-nome">
        <span>RWT</span>
        <span className="vinheta-sub">RewallTech</span>
      </p>

      <div className="vinheta-progresso" />

      <button
        type="button"
        className="vinheta-pular"
        onClick={encerrar}
        aria-label="Pular introdução"
      >
        pular
      </button>
    </div>
  );
}
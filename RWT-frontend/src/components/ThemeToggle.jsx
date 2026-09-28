export default function ThemeToggle({ tema, alternarTema, className = "" }) {
    const escuro = tema === "dark";
    const rotulo = escuro ? "Ativar tema claro" : "Ativar tema escuro";

    return (
        <button
            type="button"
            className={`adm-icon-btn ${className}`.trim()}
            onClick={alternarTema}
            aria-label={rotulo}
            title={rotulo}
        >
            {escuro ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </button>
    );
}
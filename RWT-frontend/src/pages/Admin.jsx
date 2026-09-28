import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme.js";
import ThemeToggle from "../components/ThemeToggle.jsx";
import "../styles/Admin.css";

const vazio = (valor) => valor || "—";

const COLUNAS_PEDIDOS = [
    { chave: "id", titulo: "ID", classe: "cell-id" },
    { chave: "nome", titulo: "Nome", classe: "cell-strong" },
    { chave: "telefone", titulo: "Telefone" },
    { chave: "email", titulo: "E-mail" },
    { chave: "endereco", titulo: "Endereço" },
    { chave: "altura", titulo: "Altura" },
    {
        chave: "mao",
        titulo: "Mão",
        render: (p) => (p.mao ? <span className="adm-pill">{p.mao}</span> : "—"),
    },
    {
        chave: "mensagem",
        titulo: "Mensagem",
        classe: "cell-msg",
        render: (p) => vazio(p.mensagem),
    },
];

const COLUNAS_PATROCINIOS = [
    { chave: "id", titulo: "ID", classe: "cell-id" },
    { chave: "nome", titulo: "Nome", classe: "cell-strong" },
    { chave: "email", titulo: "E-mail" },
    { chave: "telefone", titulo: "Telefone" },
    {
        chave: "tipo",
        titulo: "Tipo",
        render: (p) => (p.tipo ? <span className="adm-pill">{p.tipo}</span> : "—"),
    },
    {
        chave: "valor",
        titulo: "Valor",
        render: (p) =>
            p.valor ? `R$ ${Number(p.valor).toFixed(2).replace(".", ",")}` : "—",
    },
    {
        chave: "mensagem",
        titulo: "Mensagem",
        classe: "cell-msg",
        render: (p) => vazio(p.mensagem),
    },
    {
        chave: "termos",
        titulo: "Termos",
        render: (p) => (
            <span className={`adm-pill ${p.termos ? "ok" : "no"}`}>
                {p.termos ? "Aceito" : "Não"}
            </span>
        ),
    },
];

function Tabela({ colunas, linhas }) {
    return (
        <div className="table-container">
            <table className="adm-table">
                <thead>
                    <tr>
                        {colunas.map((c) => (
                            <th key={c.chave}>{c.titulo}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {linhas.map((linha) => (
                        <tr key={linha.id}>
                            {colunas.map((c) => (
                                <td
                                    key={c.chave}
                                    data-label={c.titulo}
                                    className={c.classe}
                                >
                                    {c.render ? c.render(linha) : vazio(linha[c.chave])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function EstadoVazio({ texto }) {
    return (
        <div className="empty-state">
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
            </svg>
            {texto}
        </div>
    );
}

export default function Admin() {
    const [pedidos, setPedidos] = useState([]);
    const [patrocinios, setPatrocinios] = useState([]);
    const [aba, setAba] = useState("pedidos");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    const navigate = useNavigate();
    const { tema, alternarTema } = useTheme();

    useEffect(() => {
        const token = localStorage.getItem("rwt_admin_token");

        if (!token) {
            navigate("/admin/login");
            return;
        }

        async function carregarDados() {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const [respostaPedidos, respostaPatrocinios] = await Promise.all([
                    fetch("/api/pedido", { headers }),
                    fetch("/api/patrocinio", { headers }),
                ]);

                if (
                    respostaPedidos.status === 401 ||
                    respostaPedidos.status === 403 ||
                    respostaPatrocinios.status === 401 ||
                    respostaPatrocinios.status === 403
                ) {
                    const status =
                        respostaPedidos.status === 401 || respostaPedidos.status === 403
                            ? respostaPedidos.status
                            : respostaPatrocinios.status;
                    console.warn("Sessão recusada pelo servidor. Status:", status);
                    localStorage.removeItem("rwt_admin_token");
                    navigate("/admin/login", {
                        state: {
                            erro: `O servidor recusou a sessão (erro ${status}). Faça login novamente.`,
                        },
                    });
                    return;
                }

                if (!respostaPedidos.ok || !respostaPatrocinios.ok) {
                    throw new Error("Erro ao carregar os dados.");
                }

                setPedidos(await respostaPedidos.json());
                setPatrocinios(await respostaPatrocinios.json());
            } catch (error) {
                console.error(error);
                setErro("Não foi possível carregar os dados.");
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, [navigate]);

    function sair() {
        localStorage.removeItem("rwt_admin_token");
        navigate("/admin/login");
    }

    return (
        <div className="rwt-admin rwt-dash">

            <header className="admin-topbar">

                <div className="admin-topbar-title">
                    <span className="adm-logo">Painel Administrativo</span>
                    <p>RWT - Projeto Bengala</p>
                </div>

                <div className="admin-topbar-actions">
                    <ThemeToggle tema={tema} alternarTema={alternarTema} />

                    <button className="logout-button" onClick={sair}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <path d="m16 17 5-5-5-5" />
                            <path d="M21 12H9" />
                        </svg>
                        <span>Sair</span>
                    </button>
                </div>

            </header>

            <main className="admin-content">

                <div className="admin-tabs" role="tablist">
                    <button
                        role="tab"
                        aria-selected={aba === "pedidos"}
                        className={aba === "pedidos" ? "tab-button active" : "tab-button"}
                        onClick={() => setAba("pedidos")}
                    >
                        Pedidos
                        <span>{pedidos.length}</span>
                    </button>

                    <button
                        role="tab"
                        aria-selected={aba === "patrocinios"}
                        className={aba === "patrocinios" ? "tab-button active" : "tab-button"}
                        onClick={() => setAba("patrocinios")}
                    >
                        Patrocínios
                        <span>{patrocinios.length}</span>
                    </button>
                </div>

                {erro && (
                    <div className="admin-error dashboard-error" role="alert">
                        {erro}
                    </div>
                )}

                {carregando ? (
                    <div className="admin-loading">
                        <div className="adm-spinner" aria-hidden="true" />
                        Carregando dados...
                    </div>
                ) : (
                    <div className="admin-section">

                        {aba === "pedidos" && (
                            <>
                                <div className="section-title">
                                    <h2>Pedidos de bengala</h2>
                                    <p>Solicitações recebidas pelo site.</p>
                                </div>

                                {pedidos.length === 0 ? (
                                    <EstadoVazio texto="Nenhum pedido recebido ainda." />
                                ) : (
                                    <Tabela colunas={COLUNAS_PEDIDOS} linhas={pedidos} />
                                )}
                            </>
                        )}

                        {aba === "patrocinios" && (
                            <>
                                <div className="section-title">
                                    <h2>Patrocínios</h2>
                                    <p>Interessados em apoiar o projeto.</p>
                                </div>

                                {patrocinios.length === 0 ? (
                                    <EstadoVazio texto="Nenhum patrocínio recebido ainda." />
                                ) : (
                                    <Tabela colunas={COLUNAS_PATROCINIOS} linhas={patrocinios} />
                                )}
                            </>
                        )}

                    </div>
                )}

            </main>
        </div>
    );
}
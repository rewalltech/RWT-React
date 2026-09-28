import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme.js";
import "../styles/Admin.css";

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

        carregarDados(token);
    }, [navigate]);

    async function carregarDados(token) {
        try {
            setCarregando(true);
            setErro("");

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const [respostaPedidos, respostaPatrocinios] =
                await Promise.all([
                    fetch("/api/pedido", {
                        headers,
                    }),
                    fetch("/api/patrocinio", {
                        headers,
                    }),
                ]);

            if (
                respostaPedidos.status === 401 ||
                respostaPedidos.status === 403 ||
                respostaPatrocinios.status === 401 ||
                respostaPatrocinios.status === 403
            ) {
                localStorage.removeItem("rwt_admin_token");
                navigate("/admin/login");
                return;
            }

            if (!respostaPedidos.ok || !respostaPatrocinios.ok) {
                throw new Error("Erro ao carregar os dados.");
            }

            const dadosPedidos = await respostaPedidos.json();
            const dadosPatrocinios = await respostaPatrocinios.json();

            setPedidos(dadosPedidos);
            setPatrocinios(dadosPatrocinios);
        } catch (error) {
            console.error(error);
            setErro("Não foi possível carregar os dados.");
        } finally {
            setCarregando(false);
        }
    }

    function sair() {
        localStorage.removeItem("rwt_admin_token");
        navigate("/admin/login");
    }

    return (
        <div className="admin-dashboard">

            <header className="admin-topbar">

                <div>
                    <h1>Painel Administrativo</h1>
                    <p>RWT - Projeto Bengala</p>
                </div>

                <div className="admin-topbar-actions">

                    <button
                        className="admin-theme-toggle"
                        onClick={alternarTema}
                        aria-label={
                            tema === "dark"
                                ? "Ativar tema claro"
                                : "Ativar tema escuro"
                        }
                        title={
                            tema === "dark"
                                ? "Ativar tema claro"
                                : "Ativar tema escuro"
                        }
                    >
                        {tema === "dark" ? "☀" : "☾"}
                    </button>

                    <button
                        className="logout-button"
                        onClick={sair}
                    >
                        Sair
                    </button>

                </div>

            </header>

            <main className="admin-content">

                <div className="admin-tabs">

                    <button
                        className={
                            aba === "pedidos"
                                ? "tab-button active"
                                : "tab-button"
                        }
                        onClick={() => setAba("pedidos")}
                    >
                        Pedidos
                        <span>{pedidos.length}</span>
                    </button>

                    <button
                        className={
                            aba === "patrocinios"
                                ? "tab-button active"
                                : "tab-button"
                        }
                        onClick={() => setAba("patrocinios")}
                    >
                        Patrocínios
                        <span>{patrocinios.length}</span>
                    </button>

                </div>

                {erro && (
                    <div className="admin-error dashboard-error">
                        {erro}
                    </div>
                )}

                {carregando ? (
                    <div className="admin-loading">
                        Carregando dados...
                    </div>
                ) : (
                    <>
                        {aba === "pedidos" && (
                            <section className="admin-section">

                                <div className="section-title">
                                    <div>
                                        <h2>Pedidos de bengala</h2>
                                        <p>
                                            Solicitações recebidas pelo site.
                                        </p>
                                    </div>
                                </div>

                                {pedidos.length === 0 ? (
                                    <div className="empty-state">
                                        Nenhum pedido recebido ainda.
                                    </div>
                                ) : (
                                    <div className="table-container">

                                        <table>

                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nome</th>
                                                    <th>Telefone</th>
                                                    <th>E-mail</th>
                                                    <th>Endereço</th>
                                                    <th>Altura</th>
                                                    <th>Mão</th>
                                                    <th>Mensagem</th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {pedidos.map((pedido) => (
                                                    <tr key={pedido.id}>

                                                        <td>
                                                            {pedido.id}
                                                        </td>

                                                        <td>
                                                            {pedido.nome}
                                                        </td>

                                                        <td>
                                                            {pedido.telefone}
                                                        </td>

                                                        <td>
                                                            {pedido.email}
                                                        </td>

                                                        <td>
                                                            {pedido.endereco}
                                                        </td>

                                                        <td>
                                                            {pedido.altura}
                                                        </td>

                                                        <td>
                                                            {pedido.mao}
                                                        </td>

                                                        <td>
                                                            {pedido.mensagem || "—"}
                                                        </td>

                                                    </tr>
                                                ))}

                                            </tbody>

                                        </table>

                                    </div>
                                )}

                            </section>
                        )}

                        {aba === "patrocinios" && (
                            <section className="admin-section">

                                <div className="section-title">
                                    <div>
                                        <h2>Patrocínios</h2>
                                        <p>
                                            Interessados em apoiar o projeto.
                                        </p>
                                    </div>
                                </div>

                                {patrocinios.length === 0 ? (
                                    <div className="empty-state">
                                        Nenhum patrocínio recebido ainda.
                                    </div>
                                ) : (
                                    <div className="table-container">

                                        <table>

                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nome</th>
                                                    <th>E-mail</th>
                                                    <th>Telefone</th>
                                                    <th>Tipo</th>
                                                    <th>Valor</th>
                                                    <th>Mensagem</th>
                                                    <th>Termos</th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {patrocinios.map(
                                                    (patrocinio) => (
                                                        <tr
                                                            key={
                                                                patrocinio.id
                                                            }
                                                        >

                                                            <td>
                                                                {
                                                                    patrocinio.id
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    patrocinio.nome
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    patrocinio.email
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    patrocinio.telefone
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    patrocinio.tipo
                                                                }
                                                            </td>

                                                            <td>
                                                                {patrocinio.valor
                                                                    ? `R$ ${Number(
                                                                          patrocinio.valor
                                                                      ).toFixed(
                                                                          2
                                                                      )}`
                                                                    : "—"}
                                                            </td>

                                                            <td>
                                                                {
                                                                    patrocinio.mensagem ||
                                                                    "—"
                                                                }
                                                            </td>

                                                            <td>
                                                                {patrocinio.termos
                                                                    ? "Aceito"
                                                                    : "Não"}
                                                            </td>

                                                        </tr>
                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>
                                )}

                            </section>
                        )}
                    </>
                )}

            </main>
        </div>
    );
}
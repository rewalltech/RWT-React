import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme.js";
import "../styles/Admin.css";

export default function LoginAdmin() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();
    const { tema, alternarTema } = useTheme();

    async function handleLogin(event) {
        event.preventDefault();

        setErro("");
        setCarregando(true);

        try {
            const resposta = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    senha,
                }),
            });

            if (!resposta.ok) {
                setErro("E-mail ou senha inválidos.");
                return;
            }

            const dados = await resposta.json();

            localStorage.setItem("rwt_admin_token", dados.token);

            navigate("/admin");
        } catch (error) {
            console.error(error);
            setErro("Não foi possível conectar ao servidor.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="admin-page">

            {/* BOTÃO DE TEMA */}
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
                {tema === "dark" ? (
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="4"
                        />
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
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                )}
            </button>

            <div className="login-card">

                <div className="login-header">
                    <h1>Painel Administrativo</h1>
                    <p>Área restrita da RWT</p>
                </div>

                <form onSubmit={handleLogin}>

                    <div className="admin-field">
                        <label htmlFor="email">
                            E-mail
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="admin-field">
                        <label htmlFor="senha">
                            Senha
                        </label>

                        <div className="password-wrapper">

                            <input
                                id="senha"
                                type={mostrarSenha ? "text" : "password"}
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(event) =>
                                    setSenha(event.target.value)
                                }
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setMostrarSenha((valor) => !valor)
                                }
                                aria-label={
                                    mostrarSenha
                                        ? "Ocultar senha"
                                        : "Mostrar senha"
                                }
                                title={
                                    mostrarSenha
                                        ? "Ocultar senha"
                                        : "Mostrar senha"
                                }
                            >
                                {mostrarSenha ? (
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M3 3l18 18" />
                                        <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                                        <path d="M9.88 5.09A10.94 10.94 0 0 1 12 4.89c5 0 8.27 4.11 9.5 7.11a11.8 11.8 0 0 1-2.08 3.17" />
                                        <path d="M6.61 6.61C4.62 7.91 3.31 9.75 2.5 12c1.23 3 4.5 7.11 9.5 7.11a10.94 10.94 0 0 0 3.41-.54" />
                                    </svg>
                                ) : (
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M2.5 12S6 4.89 12 4.89 21.5 12 21.5 12 18 19.11 12 19.11 2.5 12 2.5 12Z" />
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="3"
                                        />
                                    </svg>
                                )}
                            </button>

                        </div>
                    </div>

                    {erro && (
                        <div className="admin-error">
                            {erro}
                        </div>
                    )}

                    <button
                        className="admin-button"
                        type="submit"
                        disabled={carregando}
                    >
                        {carregando ? "Entrando..." : "Entrar"}
                    </button>

                </form>
            </div>
        </div>
    );
}
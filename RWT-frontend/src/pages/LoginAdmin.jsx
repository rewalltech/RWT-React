import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme.js";
import ThemeToggle from "../components/ThemeToggle.jsx";
import "../styles/Admin.css";

export default function LoginAdmin() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [erro, setErro] = useState(useLocation().state?.erro ?? "");
    const [carregando, setCarregando] = useState(false);
    const [demorando, setDemorando] = useState(false);

    const navigate = useNavigate();
    const { tema, alternarTema } = useTheme();

    // O backend (Render) "dorme" quando fica sem uso. Ao abrir a tela de login
    // já mandamos uma requisição para acordá-lo enquanto a pessoa digita.
    useEffect(() => {
        fetch("/api/pedido").catch(() => {});
    }, []);

    // Se o login passar de 4s, avisa que o servidor está acordando.
    useEffect(() => {
        if (!carregando) return;
        const timer = setTimeout(() => setDemorando(true), 4000);
        return () => clearTimeout(timer);
    }, [carregando]);

    async function handleLogin(event) {
        event.preventDefault();

        setErro("");
        setDemorando(false);
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
            const token =
                dados.token ?? dados.accessToken ?? dados.access_token ?? dados.jwt;

            if (!token) {
                console.error("Resposta do login sem token:", dados);
                setErro("O servidor respondeu, mas não enviou o token de acesso.");
                return;
            }

            localStorage.setItem("rwt_admin_token", token);

            navigate("/admin");
        } catch (error) {
            console.error(error);
            setErro("Não foi possível conectar ao servidor.");
        } finally {
            setCarregando(false);
            setDemorando(false);
        }
    }

    return (
        <div className="rwt-admin rwt-login">

            <div className="adm-login-tools">
                <Link to="/" className="adm-back-link">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Voltar ao site
                </Link>

                <ThemeToggle tema={tema} alternarTema={alternarTema} />
            </div>

            <div className="login-card">

                <div className="login-header">
                    <span className="login-badge">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <rect x="4" y="11" width="16" height="10" rx="2" />
                            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                        </svg>
                        Área restrita
                    </span>
                    <h1>Painel Administrativo</h1>
                    <p>Entre para gerenciar os pedidos e patrocínios da RWT.</p>
                </div>

                <form onSubmit={handleLogin}>

                    <div className="admin-field">
                        <label htmlFor="email">E-mail</label>

                        <input
                            id="email"
                            type="email"
                            autoComplete="username"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    <div className="admin-field">
                        <label htmlFor="senha">Senha</label>

                        <div className="password-wrapper">
                            <input
                                id="senha"
                                type={mostrarSenha ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(event) => setSenha(event.target.value)}
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setMostrarSenha((valor) => !valor)}
                                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                                title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                            >
                                {mostrarSenha ? (
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M3 3l18 18" />
                                        <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                                        <path d="M9.88 5.09A10.94 10.94 0 0 1 12 4.89c5 0 8.27 4.11 9.5 7.11a11.8 11.8 0 0 1-2.08 3.17" />
                                        <path d="M6.61 6.61C4.62 7.91 3.31 9.75 2.5 12c1.23 3 4.5 7.11 9.5 7.11a10.94 10.94 0 0 0 3.41-.54" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M2.5 12S6 4.89 12 4.89 21.5 12 21.5 12 18 19.11 12 19.11 2.5 12 2.5 12Z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {erro && (
                        <div className="admin-error" role="alert">
                            {erro}
                        </div>
                    )}

                    {demorando && (
                        <div className="admin-info" role="status">
                            O servidor está acordando, isso pode levar até 1 minuto na
                            primeira vez. Aguarde...
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
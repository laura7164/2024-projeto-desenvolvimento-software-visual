import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [mensagem, setMensagem] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const loginRequest = {
            username,
            password
        };

        try {
            const response = await fetch('http://localhost:5244/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginRequest)
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }

            // Exibe a mensagem de sucesso ao fazer login
            const data = await response.json();
            setMensagem(data.message);
        } catch (error: any) {
            console.error('Erro:', error);
            setMensagem(`Erro ao fazer login: ${error.message}`);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            {mensagem && <p>{mensagem}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Nome de Usuário:
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Senha:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;

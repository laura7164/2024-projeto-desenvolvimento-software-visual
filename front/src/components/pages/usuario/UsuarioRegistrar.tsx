import React, { useState } from 'react';

function CadastrarUsuario() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [mensagem, setMensagem] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const novoUsuario = {
            username,
            password,
            criadoEm: new Date().toISOString() // Gera a data atual em formato ISO
        };

        try {
            const response = await fetch('http://localhost:5244/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoUsuario)
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }

            // Limpa os campos e exibe mensagem de sucesso
            setUsername('');
            setPassword('');
            setMensagem('Usuário cadastrado com sucesso!');
        } catch (error: any) {
            console.error('Erro:', error);
            setMensagem(`Erro ao cadastrar: ${error.message}`);
        }
    }

    return (
        <div>
            <h2>Cadastrar Usuário</h2>
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
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default CadastrarUsuario;

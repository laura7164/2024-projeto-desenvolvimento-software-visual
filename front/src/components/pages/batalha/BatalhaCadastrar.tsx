import React, { useState } from 'react';
import "../../../styles/styles.css";
import { Link } from "react-router-dom";

function BatalhaCadastrar() {
    const [pokemonId1, setPokemonId1] = useState<string>(''); 
    const [pokemonId2, setPokemonId2] = useState<string>(''); 
    const [titulo, setTitulo] = useState<string>('');
    const [mensagem, setMensagem] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (pokemonId1.trim() === '' || pokemonId2.trim() === '' || titulo.trim() === '') {
            setMensagem('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const batalha = {
            titulo,
        };

        fetch(`http://localhost:5244/api/batalha/cadastrar/${pokemonId1}/${pokemonId2}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(batalha),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao cadastrar a batalha: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const { pokemon1, pokemon2 } = data;

                let resultado: string;
                if (pokemon1.pc === pokemon2.pc) {
                    resultado = 'Empate! Nenhum dos Pokémons venceu.';
                } else {
                    const vencedor = pokemon1.pc > pokemon2.pc ? pokemon1.nome : pokemon2.nome;
                    resultado = `Batalha cadastrada com sucesso! Vencedor: ${vencedor}`;
                }

                setMensagem(resultado);
                setPokemonId1(''); 
                setPokemonId2(''); 
                setTitulo('');
            })
            .catch(error => {
                console.error('Erro:', error);
                setMensagem('Erro ao cadastrar a batalha. Verifique os IDs dos Pokémons e tente novamente.');
            });
    }

    return (
        <div id="app">
            <div id="background">
                <video loop autoPlay muted>
                <source src="/assets/video-fundo.mp4" type="video/mp4" />
                </video>
            </div>

            <header>
                <img src="/assets/logo-pokemon.png" alt="Logo Pokémon" />
                <ul className="navigation">
                <li><Link to="/" className="navigation__link">Voltar pro Home</Link></li>
                <li><Link to="/pages/batalha/cadastrar" className="navigation__link">Cadastrar</Link></li>
                <li><Link to="/pages/batalha/listar" className="navigation__link">Listar</Link></li>
                <li><Link to="/pages/batalha/buscar" className="navigation__link">Buscar</Link></li>
                <li><Link to="/pages/batalha/deletar" className="navigation__link">Deletar</Link></li>
                </ul>
            </header>

            <div className="cadastrar">
                <h2>Cadastrar uma batalha</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Título da Batalha:
                        <input
                            type="text"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        ID do Pokémon 1:
                        <input
                            type="text" 
                            value={pokemonId1}
                            onChange={e => setPokemonId1(e.target.value)} 
                            required
                        />
                    </label>
                    <br />
                    <label>
                        ID do Pokémon 2:
                        <input
                            type="text" 
                            value={pokemonId2}
                            onChange={e => setPokemonId2(e.target.value)} 
                            required
                        />
                    </label>
                    <br />
                    <button type="submit">Cadastrar batalha</button>
                </form>
                {mensagem && <p>{mensagem}</p>}
            </div>
        </div>
    );
}

export default BatalhaCadastrar;

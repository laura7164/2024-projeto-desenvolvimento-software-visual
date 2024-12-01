import React, { useState } from "react";
import "../../../styles/styles.css";
import { Link } from "react-router-dom";

const SeusPokemonsCadastrar = () => {
    const [nome, setNome] = useState("");
    const [pc, setPc] = useState(0);
    const [tipoId, setTipoId] = useState(""); 

    const cadastrarSeuPokemon = async () => {
        
        const pokemonData = {
            nome,
            pc,
            tipoId: parseInt(tipoId, 10), 
        };

        try {
            const response = await fetch(`http://localhost:5244/api/seu_pokemon/cadastrar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pokemonData),
            });

            if (response.ok) {
                alert("Pokémon cadastrado com sucesso!");
                
                setNome("");
                setPc(0);
                setTipoId("");
            } else {
                const errorMessage = await response.text();
                alert(`Erro ao cadastrar: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

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
                <li><Link to="/pages/seu_pokemon/cadastrar" className="navigation__link">Cadastrar</Link></li>
                <li><Link to="/pages/seu_pokemon/listar" className="navigation__link">Listar</Link></li>
                <li><Link to="/pages/seu_pokemon/buscar" className="navigation__link">Buscar</Link></li>
                </ul>
            </header>

            <div className="cadastrar">
                <h2>Cadastrar seu pokémon</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        cadastrarSeuPokemon();
                    }}
                >
                    <label>
                        Nome:
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    </label>
                    <br />

                    <label>
                        PC:
                        <input
                            type="number"
                            value={pc}
                            onChange={(e) => setPc(Number(e.target.value))}
                            required
                        />
                    </label>
                    <br />

                    <label>
                        Tipo:
                        <select value={tipoId} onChange={(e) => setTipoId(e.target.value)} required>
                            <option value="">Selecione um tipo</option>
                            <option value="1">Normal</option>
                            <option value="2">Água</option>
                            <option value="3">Fogo</option>
                            <option value="4">Planta</option>
                            <option value="5">Elétrico</option>
                            <option value="6">Inseto</option>
                            <option value="7">Lutador</option>
                            <option value="8">Gelo</option>
                            <option value="9">Fada</option>
                            <option value="10">Dragão</option>
                            <option value="11">Venenoso</option>
                            <option value="12">Sombrio</option>
                            <option value="13">Fantasma</option>
                        </select>
                    </label>

                    <button type="submit">Cadastrar SeuPokemon</button>
                </form>
            </div>
        </div>
    );
};

export default SeusPokemonsCadastrar;

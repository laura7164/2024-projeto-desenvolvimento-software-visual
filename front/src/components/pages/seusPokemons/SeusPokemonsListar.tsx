import { useEffect, useState } from "react";
import { SeusPokemons } from "../../../models/SeusPokemons";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../styles/styles.css";

function SeusPokemonsListar() {
    const [pokemons, setPokemons] = useState<SeusPokemons[]>([]);

    useEffect(() => {
        fetch(`http://localhost:5244/api/seu_pokemon/listar`)
            .then((resposta) => {
                return resposta.json();
            })
            .then((pokemons) => {
                setPokemons(pokemons);
            });
    }, []);

    
    function deletar(id: string) {
        if (!id) {
            console.error("ID inválido");
            return;
        }

        axios
            .delete(`http://localhost:5244/api/seu_pokemon/deletar/${id}`)
            .then((resposta) => {
                console.log(resposta.data);
                setPokemons(pokemons.filter((pokemon) => pokemon.seusPokemonsId !== id));
            })
            .catch((erro) => {
                console.error("Erro ao deletar Pokémon:", erro);
                alert("Erro ao deletar o Pokémon. Tente novamente.");
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
                <li><Link to="/pages/seu_pokemon/cadastrar" className="navigation__link">Cadastrar</Link></li>
                <li><Link to="/pages/seu_pokemon/listar" className="navigation__link">Listar</Link></li>
                <li><Link to="/pages/seu_pokemon/buscar" className="navigation__link">Buscar</Link></li>
                </ul>
            </header>

            <div className="listar">
                <h1>Listagem dos seus pokémons</h1>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>PC</th>
                            <th>Tipo</th>
                            <th>Deletar</th>
                            <th>Alterar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemons.map((pokemon) => (
                            <tr key={pokemon.seusPokemonsId}>
                                <td>{pokemon.seusPokemonsId}</td>
                                <td>{pokemon.nome}</td>
                                <td>{pokemon.pc}</td>
                                <td>{pokemon.tipo?.nome}</td>
                                <td>
                                    <button onClick={() => deletar(pokemon.seusPokemonsId!)}>
                                        Deletar
                                    </button>
                                </td>
                                <td>
                                    <Link to={`/pages/seu_pokemon/alterar/${pokemon.seusPokemonsId}`}>
                                        Alterar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SeusPokemonsListar;

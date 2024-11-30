import { useEffect, useState } from "react";
import { SeusPokemons } from "../../../models/SeusPokemons";
import axios from "axios";
import { Link } from "react-router-dom";

function SeusPokemonsListar() {
    const [pokemons, setPokemons] = useState<SeusPokemons[]>([]);

    useEffect(() => {
        fetch("http://localhost:5244/api/seu_pokemon/listar")
            .then((resposta) => {
                return resposta.json();
            })
            .then((pokemons) => {
                setPokemons(pokemons);
            });
    }, []); // Adicionado [] para evitar loop infinito na chamada da API

    // Função deletar agora usa o ID
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
        <div className="container">
            <h1>Lista de Pokémons</h1>
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
                                <Link to={`/pages/seusPokemons/alterar/${pokemon.seusPokemonsId}`}>
                                    Alterar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SeusPokemonsListar;

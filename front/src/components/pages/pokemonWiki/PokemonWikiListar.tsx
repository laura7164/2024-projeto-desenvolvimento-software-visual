import { useEffect, useState } from "react";
import { PokemonWiki } from "../../../models/PokemonWiki";
import axios from "axios";
import { Link } from "react-router-dom";

function PokemonWikiListar() {
  const [pokemons, setPokemons] = useState<PokemonWiki[]>([]);

  useEffect(() => {
    fetch("http://localhost:5244/api/pokemon_wiki/listar")
      .then((resposta) => {
        return resposta.json();
      })
      .then((pokemons) => {
        setPokemons(pokemons);
      });
  });

  // Função deletar agora usa o nome
  function deletar(nome: string) {
    axios
      .delete(`http://localhost:5244/api/pokemon_wiki/deletar/${nome}`)
      .then((resposta) => {
        console.log(resposta.data);
        // Atualiza a lista de Pokémon após deletar
        setPokemons(pokemons.filter((pokemon) => pokemon.nome !== nome));
      });
  }

  return (
    <div className="container">
      <h1>Lista de Pokemons</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Pre Evolução</th>
            <th>Evolui Para</th>
            <th>Deletar</th>
            <th>Alterar</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemon) => (
            <tr key={pokemon.pokemonWikiId}>
              <td>{pokemon.pokemonWikiId}</td>
              <td>{pokemon.nome}</td>
              <td>{pokemon.tipo?.nome}</td>
              <td>{pokemon.evoluiPara}</td>
              <td>{pokemon.preEvolucoes}</td>
              <td>
                <button onClick={() => deletar(pokemon.nome!)}>
                  Deletar
                </button>
              </td>
              <td>
                <Link to={`/pages/pokemonWiki/alterar/${pokemon.nome}`}>
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

export default PokemonWikiListar;

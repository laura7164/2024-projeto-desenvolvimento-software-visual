import { useEffect, useState } from "react";
import { PokemonWiki } from "../../../models/PokemonWiki";
import axios from "axios";
import { Link } from "react-router-dom";

function PokemonWikiListar() {
  const [pokemons, setPokemons] = useState<PokemonWiki[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5244/api/pokemon_wiki/listar`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data); 
        setPokemons(data); 
      })
      .catch(error => {
        console.error("Erro ao buscar Pokémon:", error.message);
      });
  }, []);

  function deletar(nome: string) {
    axios
      .delete(`http://localhost:5244/api/pokemon_wiki/deletar/${nome}`)
      .then((resposta) => {
        console.log(resposta.data);
        
        setPokemons(pokemons.filter((pokemon) => pokemon.nome !== nome));
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
          <li><Link to="/pages/pokemon_wiki/cadastrar" className="navigation__link">Cadastrar</Link></li>
          <li><Link to="/pages/pokemon_wiki/listar" className="navigation__link">Listar</Link></li>
          <li><Link to="/pages/pokemon_wiki/buscar" className="navigation__link">Buscar</Link></li>
        </ul>
      </header>

      <div className="listar">
        <h1>Listagem dos pokémons da pokedex</h1>
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
                <td>{pokemon.tipo?.nome || "Não disponível"}</td>
                <td>{pokemon.preEvolucoes?.join(", ") || "Não disponível"}</td>
                <td>{pokemon.evoluiPara?.join(", ") || "Não disponível"}</td>
                <td>
                  <button onClick={() => deletar(pokemon.nome!)}>Deletar</button>
                </td>
                <td>
                  <Link to={`/pages/pokemon_wiki/alterar/${pokemon.nome}`}>
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

export default PokemonWikiListar;

import { useEffect, useState } from "react";
import { PokemonWiki } from "../../../models/PokemonWiki";
import { Tipo } from "../../../models/Tipo";
import axios from "axios";

function CadastrarPokemonWiki() {
    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [tipos, setTipos] = useState<Tipo[]>([]);
    const [tipoId, setTipoId] = useState(0);
    const [preEvolucoes, setPreEvolucoes] = useState<string[]>([]);
    const [evoluiPara, setEvoluiPara] = useState<string[]>([]);

    useEffect(() => {
        axios
        .get<Tipo[]>("http://localhost:5244/api/tipo/listar")
        .then((resposta) => {
            setTipos(resposta.data);
        });
    });

    function enviarPokemonWiki(e: any) {
    e.preventDefault();

    const pokemonWiki: PokemonWiki = {
      nome,
      descricao,
      preEvolucoes,
      evoluiPara,
      tipoId,
    };
    
    fetch("http://localhost:5244/api/pokemon_wiki/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemonWiki),
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((pokemonWiki) => {
        console.log("Pokemon cadastrado", pokemonWiki);
      });
  }

  return (
    <div id="cadastrar_pokemon" className="container">
      <h1>Cadastrar Pokemon Wiki</h1>
      <form onSubmit={enviarPokemonWiki}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            onChange={(e: any) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            onChange={(e: any) => setDescricao(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="preEvolucoes">Pré Evoluções (separadas por vírgulas)</label>
          <input
            type="text"
            id="preEvolucoes"
            name="preEvolucoes"
            onChange={(e: any) => setPreEvolucoes(e.target.value.split(","))}
          />
        </div>

        <div>
          <label htmlFor="evoluiPara">Evolui para (separadas por vírgulas)</label>
          <input
            type="text"
            id="evoluiPara"
            name="evoluiPara"
            onChange={(e: any) => setEvoluiPara(e.target.value.split(","))}
          />
        </div>

        <div>
          <label htmlFor="tipo">Tipos</label>
          <select
            onChange={(e: any) => setTipoId(e.target.value)}
          >
            {tipos.map((tipo) => (
              <option
                value={tipo.TipoId}
                key={tipo.TipoId}
              >
                {tipo.nome}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Cadastrar Pokemon Wiki</button>
      </form>
    </div>
  );
}

export default CadastrarPokemonWiki;



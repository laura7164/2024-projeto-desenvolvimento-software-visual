import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PokemonWiki } from "../../../models/PokemonWiki";
import { Tipo } from "../../../models/Tipo";

function PokemonWikiAlterar() {
  const { nomeParam } = useParams(); 
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [tipoId, setTipoId] = useState<number>(0);
  const [preEvolucoes, setPreEvolucoes] = useState<string[]>([]);
  const [evoluiPara, setEvoluiPara] = useState<string[]>([]);

  useEffect(() => {
    if (nomeParam) {
      axios
        .get<PokemonWiki>(
          `http://localhost:5244/api/pokemon_wiki/buscar_por_nome/${nomeParam}`
        )
        .then((resposta) => {
          setNome(resposta.data.nome);
          setDescricao(resposta.data.descricao);
          setPreEvolucoes(resposta.data.preEvolucoes);
          setEvoluiPara(resposta.data.evoluiPara);
          setTipoId(resposta.data.tipoId!); 
          buscarTipos();
        });
    }
  }, [nomeParam]); 

  function buscarTipos() {
    axios
      .get<Tipo[]>("http://localhost:5244/api/tipo/listar")
      .then((resposta) => {
        setTipos(resposta.data);
      });
  }

  function enviarPokemonWiki(e: any) {
    e.preventDefault();

    const pokemonWiki: PokemonWiki = {
      nome: nome,
      descricao: descricao,
      preEvolucoes: preEvolucoes,
      evoluiPara: evoluiPara,
      tipoId: tipoId,
    };

    axios
      .put(`http://localhost:5244/api/pokemon_wiki/alterar_por_nome/${nomeParam}`, pokemonWiki)
      .then((resposta) => {
        console.log(resposta.data);
      });
  }

  return (
    <div id="alterar-pokemonwiki" className="container">
      <h1>Alterar PokemonWiki</h1>
      <form onSubmit={enviarPokemonWiki}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            required
            onChange={(e: any) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            value={descricao}
            name="descricao"
            onChange={(e: any) => setDescricao(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="preEvolucoes">Pré Evoluções</label>
          <input
            type="text"
            id="preEvolucoes"
            name="preEvolucoes"
            value={preEvolucoes}
            onChange={(e: any) => setPreEvolucoes(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="evoluiPara">Evolui para</label>
          <input
            type="text"
            id="evoluiPara"
            name="evoluiPara"
            value={evoluiPara}
            onChange={(e: any) => setEvoluiPara(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="tipo">Tipos</label>
          <select
            value={tipoId}
            onChange={(e: any) => setTipoId(Number(e.target.value))}
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

        <button type="submit">Alterar PokemonWiki</button>
      </form>
    </div>
  );
}

export default PokemonWikiAlterar;

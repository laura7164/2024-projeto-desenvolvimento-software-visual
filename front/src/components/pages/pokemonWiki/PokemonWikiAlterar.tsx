import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PokemonWikiAlterar = () => {
  const { nomeParam } = useParams();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoId, setTipoId] = useState(""); // Armazena o ID do Tipo
  const [evoluiPara, setEvoluiPara] = useState("");
  const [preEvolucoes, setPreEvolucoes] = useState("");

  useEffect(() => {
    if (nomeParam) {
      // Busca os dados do Pokémon para preencher o formulário
      axios
        .get(`http://localhost:5244/api/pokemon_wiki/buscar/${nomeParam}`)
        .then((resposta) => {
          setNome(resposta.data.nome);
          setDescricao(resposta.data.descricao);
          setTipoId(resposta.data.tipoId.toString()); // Converte para string para uso no select
          setEvoluiPara(resposta.data.evoluiPara.join(", ")); // Array para string
          setPreEvolucoes(resposta.data.preEvolucoes.join(", ")); // Array para string
        })
        .catch((error) => {
          console.error("Erro ao buscar Pokémon:", error);
          alert("Erro ao buscar Pokémon. Tente novamente.");
        });
    }
  }, [nomeParam]);

  const alterarPokemonWiki = async () => {
    // Montando o JSON no formato esperado
    const pokemonData = {
      nome,
      descricao,
      tipoId: parseInt(tipoId, 10), // Certifique-se de que é um número
      evoluiPara: evoluiPara.split(",").map((s) => s.trim()), // Converte string separada por vírgulas em array
      preEvolucoes: preEvolucoes.split(",").map((s) => s.trim()), // Converte string separada por vírgulas em array
    };

    try {
      const response = await axios.put(
        `http://localhost:5244/api/pokemon_wiki/alterar/${nomeParam}`,
        pokemonData
      );

      if (response.status === 200) {
        alert("Pokémon alterado com sucesso!");
      } else {
        alert("Erro ao alterar Pokémon.");
      }
    } catch (error) {
      console.error("Erro ao alterar Pokémon:", error);
      alert("Erro ao salvar as alterações. Tente novamente.");
    }
  };

  return (
    <div>
      <h2>Alterar Pokémon Wiki</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alterarPokemonWiki();
        }}
      >
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Descrição:
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Tipo:
          <select
            value={tipoId}
            onChange={(e) => setTipoId(e.target.value)}
            required
          >
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
        <br />

        <label>
          Evolui Para (separado por vírgulas):
          <input
            type="text"
            value={evoluiPara}
            onChange={(e) => setEvoluiPara(e.target.value)}
          />
        </label>
        <br />

        <label>
          Pré-Evoluções (separado por vírgulas):
          <input
            type="text"
            value={preEvolucoes}
            onChange={(e) => setPreEvolucoes(e.target.value)}
          />
        </label>
        <br />

        <button type="submit">Alterar Pokémon Wiki</button>
      </form>
    </div>
  );
};

export default PokemonWikiAlterar;

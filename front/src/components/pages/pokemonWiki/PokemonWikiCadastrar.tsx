import "../../../styles/styles.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const PokemonWikiCadastrar = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoId, setTipoId] = useState(""); 
  const [evoluiPara, setEvoluiPara] = useState("");
  const [preEvolucoes, setPreEvolucoes] = useState("");

  const cadastrarPokemonWiki = async () => {
    
    const pokemonData = {
      nome,
      descricao,
      tipoId: parseInt(tipoId, 10), 
      evoluiPara: evoluiPara.split(","), 
      preEvolucoes: preEvolucoes.split(","), 
    };

    try {
      const response = await fetch(`http://localhost:5244/api/pokemon_wiki/cadastrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokemonData),
      });

      if (response.ok) {
        alert("Pokémon cadastrado com sucesso!");
        
        setNome("");
        setDescricao("");
        setTipoId("");
        setEvoluiPara("");
        setPreEvolucoes("");
      } else {
        const errorMessage = await response.text();
        alert('Erro ao cadastrar: ${errorMessage}');
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
          <li><Link to="/pages/pokemon_wiki/cadastrar" className="navigation__link">Cadastrar</Link></li>
          <li><Link to="/pages/pokemon_wiki/listar" className="navigation__link">Listar</Link></li>
          <li><Link to="/pages/pokemon_wiki/buscar" className="navigation__link">Buscar</Link></li>
        </ul>
      </header>
    
      <div className="cadastrar">
        <h2>Cadastrar um pokémon na pokedex</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            cadastrarPokemonWiki();
          }}
        >
          <label>
            Nome:
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
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

          <button type="submit">Cadastrar Pokémon Wiki</button>
        </form>
      </div>
    </div>
  );
};

export default PokemonWikiCadastrar;

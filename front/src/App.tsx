import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CadastroPokemonWiki from './components/pages/pokemonWiki/PokemonWikiCadastrar';
import ListaPokemonWiki from './components/pages/pokemonWiki/PokemonWikiListar';
import ConsultarPokemonWiki from './components/pages/pokemonWiki/PokemonWikiBuscar';
import AlterarPokemonWiki from './components/pages/pokemonWiki/PokemonWikiAlterar';
import DeletarPokemonWiki from './components/pages/pokemonWiki/PokemonWikiDeletar';

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/pages/pokemon/cadastrar">cadastrar pokemon</Link>
            </li>
            <li>
              <Link to="/pages/pokemon/listar">listar pokemon</Link>
            </li>
            <li>
              <Link to="/pages/pokemon/buscar">buscar pokemon</Link>
            </li>
            <li>
              <Link to="/pages/pokemon/alterar">alterar pokemon</Link>
            </li>
            <li>
              <Link to="/pages/pokemon/deletar">deletar pokemon</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<CadastroPokemonWiki />} />
          <Route path="/pages/pokemon/cadastrar" element={<CadastroPokemonWiki />} />
          <Route path="/pages/pokemon/listar" element={<ListaPokemonWiki />} />
          <Route path="/pages/pokemon/buscar" element={<ConsultarPokemonWiki />} />
          <Route path="/pages/pokemon/alterar" element={<AlterarPokemonWiki />} />
          <Route path="/pages/pokemon/deletar" element={<DeletarPokemonWiki />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

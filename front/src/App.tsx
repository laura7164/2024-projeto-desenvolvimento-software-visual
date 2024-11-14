import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CadastroPokemonWiki from './components/pages/pokemonWiki/PokemonWikiCadastrar';
import ListaPokemonWiki from './components/pages/pokemonWiki/PokemonWikiListar';

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
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<CadastroPokemonWiki />} />
          <Route path="/pages/pokemon/cadastrar" element={<CadastroPokemonWiki />} />
          <Route path="/pages/pokemon/listar" element={<ListaPokemonWiki />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

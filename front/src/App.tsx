import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CadastroPokemonWiki from './components/pages/pokemonWiki/PokemonWikiCadastrar';

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
              <Link to="/pages/produto/listar">cadastrar pokemon</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<CadastroPokemonWiki />} />
          <Route path="/pages/produto/listar" element={<CadastroPokemonWiki />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

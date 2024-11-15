import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CadastrarPokemonWiki from './components/pages/pokemonWiki/PokemonWikiCadastrar';
import ListarPokemonWiki from './components/pages/pokemonWiki/PokemonWikiListar';
import BuscarPokemonWiki from './components/pages/pokemonWiki/PokemonWikiBuscar';
import AlterarPokemonWiki from './components/pages/pokemonWiki/PokemonWikiAlterar';
import DeletarPokemonWiki from './components/pages/pokemonWiki/PokemonWikiDeletar';
import CadastrarSeuPokemon from './components/pages/seusPokemons/SeusPokemonsCadastrar';
import ListarSeusPokemons from './components/pages/seusPokemons/SeusPokemonsListar';
import BuscarSeuPokemon from './components/pages/seusPokemons/SeusPokemonsBuscar';
import AlterarSeuPokemon from './components/pages/seusPokemons/SeusPokemonsAlterar';
import DeletarSeuPokemon from './components/pages/seusPokemons/SeusPokemonsDeletar';

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
              <Link to="/pages/pokemonWiki/cadastrar">cadastrar pokemon</Link>
            </li>
            <li>
              <Link to="/pages/pokemonWiki/listar">listar pokemon</Link>
            </li>
            <li>
              <Link to="/pages/pokemonWiki/buscar">buscar pokemon</Link>
            </li>
            <li>
              <Link to="/pages/pokemonWiki/alterar">alterar pokemon</Link>
            </li>
            <li>
              <Link to="/pages/pokemonWiki/deletar">deletar pokemon</Link>
            </li>
            <li>
              <Link to="/pages/pokemonWiki/deletar">deletar pokemon</Link>
            </li>
            <li>
              <Link to="/pages/seusPokemons/cadastrar">cadastrar seu pokemon</Link>
            </li>
            <li>
              <Link to="/pages/seusPokemons/listar">listar seus pokemons</Link>
            </li>
            <li>
              <Link to="/pages/seusPokemons/buscar">buscar seus pokemons</Link>
            </li>
            <li>
              <Link to="/pages/seusPokemons/alterar">alterar um pokemon dos seus pokemons</Link>
            </li>
            <li>
              <Link to="/pages/seusPokemons/deletar">deletar um pokemon dos seus pokemons</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<CadastrarPokemonWiki />} />
          <Route path="/pages/pokemonWiki/cadastrar" element={<CadastrarPokemonWiki />} />
          <Route path="/pages/pokemonWiki/listar" element={<ListarPokemonWiki />} />
          <Route path="/pages/pokemonWiki/buscar" element={<BuscarPokemonWiki />} />
          <Route path="/pages/pokemonWiki/alterar" element={<AlterarPokemonWiki />} />
          <Route path="/pages/pokemonWiki/deletar" element={<DeletarPokemonWiki />} />
          <Route path="/pages/seusPokemons/cadastrar" element={<CadastrarSeuPokemon />} />
          <Route path="/pages/seusPokemons/listar" element={<ListarSeusPokemons />} />
          <Route path="/pages/seusPokemons/buscar" element={<BuscarSeuPokemon />} />
          <Route path="/pages/seusPokemons/alterar" element={<AlterarSeuPokemon />} />
          <Route path="/pages/seusPokemons/deletar" element={<DeletarSeuPokemon />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
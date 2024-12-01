import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home/Home";
import PokemonWikiMain from "./components/pages/pokemonWiki/PokemonWikiMain"
import PokemonWikiCadastrar from './components/pages/pokemonWiki/PokemonWikiCadastrar';
import PokemonWikiListar from './components/pages/pokemonWiki/PokemonWikiListar';
import PokemonWikiBuscar from './components/pages/pokemonWiki/PokemonWikiBuscar';
import PokemonWikiAlterar from './components/pages/pokemonWiki/PokemonWikiAlterar';
import SeusPokemonsMain from "./components/pages/seusPokemons/SeusPokemonsMain";
import SeusPokemonsCadastrar from './components/pages/seusPokemons/SeusPokemonsCadastrar';
import SeusPokemonsListar from './components/pages/seusPokemons/SeusPokemonsListar';
import SeusPokemonsBuscar from './components/pages/seusPokemons/SeusPokemonsBuscar';
import SeusPokemonsAlterar from './components/pages/seusPokemons/SeusPokemonsAlterar';
import BatalhaMain from './components/pages/batalha/BatalhaMain';
import BatalhaCadastrar from './components/pages/batalha/BatalhaCadastrar';
import BatalhaListar from './components/pages/batalha/BatalhaListar';
import BatalhaBuscar from './components/pages/batalha/BatalhaBuscar';
import BatalhaDeletar from './components/pages/batalha/BatalhaDeletar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/pokemon_wiki/main" element={<PokemonWikiMain />} />
        <Route path="/pages/pokemon_wiki/cadastrar" element={<PokemonWikiCadastrar />} />
        <Route path="/pages/pokemon_wiki/listar" element={<PokemonWikiListar />} />
        <Route path="/pages/pokemon_wiki/buscar" element={<PokemonWikiBuscar />} />
        <Route path="/pages/pokemon_wiki/alterar/:nomeParam" element={<PokemonWikiAlterar />} />
        <Route path="/pages/seu_pokemon/main" element={<SeusPokemonsMain />} />
        <Route path="/pages/seu_pokemon/cadastrar" element={<SeusPokemonsCadastrar />} />
        <Route path="/pages/seu_pokemon/listar" element={<SeusPokemonsListar />} />
        <Route path="/pages/seu_pokemon/buscar" element={<SeusPokemonsBuscar />} />
        <Route path="/pages/seu_pokemon/alterar/:idParam" element={<SeusPokemonsAlterar />} />
        <Route path="/pages/batalha/main" element={<BatalhaMain />} />
        <Route path="/pages/batalha/cadastrar" element={<BatalhaCadastrar />} />
        <Route path="/pages/batalha/listar" element={<BatalhaListar />} />
        <Route path="/pages/batalha/buscar" element={<BatalhaBuscar />} />
        <Route path="/pages/batalha/deletar" element={<BatalhaDeletar />} />
      </Routes>
    </Router>
  );
};

export default App;

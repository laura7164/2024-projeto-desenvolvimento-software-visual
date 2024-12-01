import "../../../styles/styles.css";
import { Link } from "react-router-dom";

function App() {
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

      <main>
        <div className="main__info">
            <h2>Pokedex</h2>
            <p>
                A página "Pokedex" permite aos usuários cadastrar, listar, buscar, alterar e deletar Pokémon. Com 
                ela, é possível adicionar novos registros, consultar os Pokémon existentes, realizar buscas rápidas
                por nome ou características, atualizar informações e remover registros quando necessário, oferecendo
                uma experiência completa de gerenciamento da Pokedex.
            </p>
        </div>

        <img src="/assets/ash-pikachu.png" alt="Ash e Pikachu" width="300px" />
      </main>

      <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
      <script>AOS.init();</script>
    </div>
  );
};

export default App;

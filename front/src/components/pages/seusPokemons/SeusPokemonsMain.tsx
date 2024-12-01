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
          <li><Link to="/pages/seu_pokemon/cadastrar" className="navigation__link">Cadastrar</Link></li>
          <li><Link to="/pages/seu_pokemon/listar" className="navigation__link">Listar</Link></li>
          <li><Link to="/pages/v/buscar" className="navigation__link">Buscar</Link></li>
        </ul>
      </header>

      <main>
        <div className="main__info">
          <h2>Seus pokémons</h2>
            <p>
              A página "Seus Pokémon" permite gerenciar sua coleção personalizada de Pokémon, com opções de cadastrar, listar, buscar, atualizar
              e excluir registros. Os Pokémon cadastrados podem ser usados para simular batalhas, oferecendo uma experiência interativa para 
              explorar estratégias e comparar equipes.
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

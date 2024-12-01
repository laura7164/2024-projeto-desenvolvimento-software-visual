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
          <li><Link to="/" className="navigation__link">Home</Link></li>
          <li><Link to="/pages/pokemon_wiki/main" className="navigation__link">Pokedex</Link></li>
          <li><Link to="/pages/seu_pokemon/main" className="navigation__link">Seus Pokemons</Link></li>
          <li><Link to="/pages/batalha/main" className="navigation__link">Simulador de batalha</Link></li>
        </ul>
      </header>

      <main>
        <div className="main__info">
          <p>
            <b>
              Bem-vindo ao nosso site, um espaço criado para todos os apaixonados
              pelo universo Pokémon!
            </b><br /><br />

              Aqui você pode explorar uma vasta coleção de Pokémon, aprender sobre suas habilidades
              e evoluções, e até mesmo simular batalhas para descobrir quais são os mais fortes!
              Seja você um treinador novato ou um mestre experiente, temos tudo o que
              você precisa para embarcar em uma jornada inesquecível.
          </p>
        </div>

        <img src="/assets/ash-pikachu.png" alt="Ash e Pikachu" width="300px" />
      </main>
    </div>
  );
};

export default App;

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
          <li><Link to="/pages/batalha/cadastrar" className="navigation__link">Cadastrar</Link></li>
          <li><Link to="/pages/batalha/listar" className="navigation__link">Listar</Link></li>
          <li><Link to="/pages/batalha/buscar" className="navigation__link">Buscar</Link></li>
          <li><Link to="/pages/batalha/deletar" className="navigation__link">Deletar</Link></li>
        </ul>
      </header>

      <main>
        <div className="main__info">
            <h2>Simulador de batalha</h2>
            <p>         
              A página "Batalha" permite criar, gerenciar e visualizar batalhas entre Pokémon cadastrados, determinando o vencedor pelo maior 
              poder de combate (PC). É possível cadastrar, listar, buscar e deletar batalhas, oferecendo uma experiência completa para acompanhar
              e explorar os resultados dos confrontos.
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

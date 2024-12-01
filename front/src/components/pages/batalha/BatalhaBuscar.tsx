import { useState } from "react";
import "../../../styles/styles.css";
import { Link } from "react-router-dom";

function BuscarBatalha() {   
    const [id, setId] = useState<string>('');
    const [titulo, setTitulo] = useState<string>('');
    const [pokemon1, setPokemon1] = useState<string>('');
    const [pokemon2, setPokemon2] = useState<string>('');
    const [vencedor, setVencedor] = useState<string>('');

    function digitar(e: React.ChangeEvent<HTMLInputElement>) {
        setId(e.target.value);
    }

    function sairCaixaTexto() {
        console.log("ID da Batalha buscada:", id);

        fetch(`http://localhost:5244/api/batalha/buscar/${id}`)
            .then(resposta => {
                console.log("Resposta da API:", resposta); 
                return resposta.json();
            })
            .then(batalha => {
                console.log("Dados recebidos:", batalha);  

                if (batalha && batalha.titulo) {  
                    setTitulo(batalha.titulo || '');
                    setPokemon1(batalha.pokemon1Id ? `ID: ${batalha.pokemon1Id}` : 'Desconhecido');
                    setPokemon2(batalha.pokemon2Id ? `ID: ${batalha.pokemon2Id}` : 'Desconhecido');
                    setVencedor(batalha.vencedor || 'Desconhecido');
                } else {
                    alert("Batalha não encontrada!");
                    setTitulo('');
                    setPokemon1('Desconhecido');
                    setPokemon2('Desconhecido');
                    setVencedor('Desconhecido');
                }
            })
            .catch(error => console.error("Erro ao buscar Batalha:", error));
    }

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

            <div className="buscar">
                <h2>Buscar uma batalha</h2>

                <input 
                    type="text" 
                    placeholder="Digite o ID da Batalha"
                    onChange={digitar}
                    onBlur={sairCaixaTexto}
                />

                <button onClick={sairCaixaTexto}>Buscar</button>

                <p><strong>Título da Batalha:</strong> {titulo}</p>
                <p><strong>Pokémon 1:</strong> {pokemon1}</p>
                <p><strong>Pokémon 2:</strong> {pokemon2}</p>
                <p><strong>Vencedor:</strong> {vencedor}</p>
            </div>
        </div>
    );
}

export default BuscarBatalha;

import { useState } from "react";
import "../../../styles/styles.css";
import { Link } from "react-router-dom";

function SeusPokemonsBuscar() {
    const [id, setId] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [pc, setPc] = useState<number | null>(null);
    const [tipo, setTipo] = useState<string>(''); 

    function digitar(e: React.ChangeEvent<HTMLInputElement>) {
        setId(e.target.value);
    }

    function sairCaixaTexto() {
        console.log("ID do Pokémon buscado:", id);

        fetch(`http://localhost:5244/api/seu_pokemon/buscar/${id}`)
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error("Pokémon não encontrado!");
                }
                return resposta.json();
            })
            .then((pokemon) => {
                console.log("Dados recebidos:", pokemon);

                if (pokemon && pokemon.nome) {
                    setNome(pokemon.nome || '');
                    setPc(pokemon.pc || null);
                    setTipo(pokemon.tipo?.nome || ''); 
                } else {
                    alert("Pokémon não encontrado!");
                    limparCampos();
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar Pokémon:", error);
                alert("Pokémon não encontrado!");
                limparCampos();
            });
    }

    function limparCampos() {
        setNome('');
        setPc(null);
        setTipo('');
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
                <li><Link to="/pages/seu_pokemon/cadastrar" className="navigation__link">Cadastrar</Link></li>
                <li><Link to="/pages/seu_pokemon/listar" className="navigation__link">Listar</Link></li>
                <li><Link to="/pages/seu_pokemon/buscar" className="navigation__link">Buscar</Link></li>
                </ul>
            </header>

            <div className="buscar">
                <h2>Buscar seu pokémon</h2>

                <input 
                    type="text"
                    placeholder="Digite o ID do Pokémon"
                    onChange={digitar}
                    onBlur={sairCaixaTexto}
                />

                <button onClick={sairCaixaTexto}>Buscar</button>
                
                <p><strong>Nome:</strong> {nome}</p>
                <p><strong>PC:</strong> {pc}</p>
                <p><strong>Tipo:</strong> {tipo}</p>
            </div>
        </div>
    );
}

export default SeusPokemonsBuscar;

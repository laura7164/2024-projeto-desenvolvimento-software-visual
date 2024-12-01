import { useState } from "react";
import "../../../styles/styles.css";
import { Link } from "react-router-dom";

function DeletarBatalha() {
    const [id, setId] = useState<string>('');
    const [mensagem, setMensagem] = useState<string>(''); 

    function digitarId(e: React.ChangeEvent<HTMLInputElement>) {
        setId(e.target.value);
    }

    function deletarBatalha() {
        fetch(`http://localhost:5244/api/batalha/deletar/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error("Batalha não encontrada.");
            }
        })
        .then(batalhaDeletada => {
            setMensagem(`Batalha com ID ${batalhaDeletada.batalhaId} deletada com sucesso!`);
            setId(''); 
        })
        .catch(error => {
            setMensagem('Erro: ${error.message}');
        });
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

            <div className="deletar">
                <h1>Deletar uma batalha</h1>

                <label>ID da Batalha a ser deletada:</label>
                <input 
                    type="text" 
                    value={id}
                    onChange={digitarId}
                />
                <button onClick={deletarBatalha}>Deletar</button>

                <p>{mensagem}</p>
            </div>
        </div>
    );
}

export default DeletarBatalha;

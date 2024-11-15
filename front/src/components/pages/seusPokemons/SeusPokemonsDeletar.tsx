import { useState } from "react";

function DeletarSeuPokemon() {
    const [id, setId] = useState<string>('');
    const [mensagem, setMensagem] = useState<string>(''); 

    function digitarId(e: React.ChangeEvent<HTMLInputElement>) {
        setId(e.target.value);
    }

    function deletarPokemon() {
        fetch(`http://localhost:5244/api/seu_pokemon/deletar/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error("Pokémon não encontrado.");
            }
        })
        .then(pokemonDeletado => {
            setMensagem(`Pokémon ${pokemonDeletado.nome} deletado com sucesso!`);
            setId(''); 
        })
        .catch(error => {
            setMensagem(`Erro: ${error.message}`);
        });
    }

    return (
        <div>
            <h1>Deletar Seu Pokémon</h1>

            <label>ID do Pokémon a ser deletado:</label>
            <input 
                type="text" 
                value={id}
                onChange={digitarId}
            />
            <button onClick={deletarPokemon}>Deletar</button>

            <p>{mensagem}</p>
        </div>
    );
}

export default DeletarSeuPokemon;
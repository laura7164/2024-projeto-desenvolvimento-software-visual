import { useState } from "react";

function DeletarPokemonWiki() {
    const [nome, setNome] = useState<string>(''); // Nome do Pokémon que será deletado
    const [mensagem, setMensagem] = useState<string>(''); // Mensagem de sucesso ou erro

    function digitarNome(e: React.ChangeEvent<HTMLInputElement>) {
        setNome(e.target.value);
    }

    function deletarPokemon() {
        fetch(`http://localhost:5244/api/pokemon_wiki/deletar/${nome}`, {
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
            setNome(''); // Limpar o nome após sucesso
        })
        .catch(error => {
            setMensagem(`Erro: ${error.message}`);
        });
    }

    return (
        <div>
            <h1>Deletar Pokémon</h1>

            <label>Nome do Pokémon a ser deletado:</label>
            <input 
                type="text" 
                value={nome}
                onChange={digitarNome}
            />
            <button onClick={deletarPokemon}>Deletar</button>

            <p>{mensagem}</p>
        </div>
    );
}

export default DeletarPokemonWiki;
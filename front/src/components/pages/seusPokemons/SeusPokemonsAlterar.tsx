import { useState } from "react";

function AlterarSeuPokemon() {
    const [id, setId] = useState<string>(''); 
    const [nome, setNome] = useState<string>(''); 
    const [pc, setPc] = useState<number | string>(''); 
    const [tipo, setTipo] = useState<string>(''); 
    const [buscaConcluida, setBuscaConcluida] = useState<boolean>(false);

    function digitarId(e: React.ChangeEvent<HTMLInputElement>) {
        setId(e.target.value);
    }

    function digitarNome(e: React.ChangeEvent<HTMLInputElement>) {
        setNome(e.target.value);
    }

    function digitarPc(e: React.ChangeEvent<HTMLInputElement>) {
        setPc(e.target.value);
    }

    function digitarTipo(e: React.ChangeEvent<HTMLInputElement>) {
        setTipo(e.target.value); // Trata como uma string separada por vírgulas
    }

    function buscarPokemon() {
        fetch(`http://localhost:5244/api/seu_pokemon/buscar/${id}`)
            .then(resposta => {
                if (resposta.ok) {
                    return resposta.json();
                } else {
                    throw new Error("Pokémon não encontrado.");
                }
            })
            .then(pokemon => {
                setNome(pokemon.nome || '');
                setPc(pokemon.pc || '');
                setTipo((pokemon.tipos || []).join(', ')); // Converte a lista de tipos para uma string separada por vírgulas
                setBuscaConcluida(true);
            })
            .catch(error => {
                console.error("Erro ao buscar Pokémon:", error);
                alert("Pokémon não encontrado!");
                setBuscaConcluida(false);
            });
    }

    function alterarPokemon() {
        const pokemonAlterado = {
            nome,
            pc,
            tipos: tipo.split(',').map(t => t.trim()), // Converte de volta para uma lista antes de enviar à API
        };

        fetch(`http://localhost:5244/api/seu_pokemon/alterar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pokemonAlterado)
        })
            .then(resposta => {
                if (resposta.ok) {
                    return resposta.json();
                } else {
                    throw new Error("Erro ao atualizar Pokémon.");
                }
            })
            .then(pokemonAtualizado => {
                alert("Pokémon atualizado com sucesso!");
                setNome(pokemonAtualizado.nome);
                setPc(pokemonAtualizado.pc);
                setTipo((pokemonAtualizado.tipos || []).join(', ')); // Atualiza o estado local
            })
            .catch(error => console.error("Erro ao atualizar Pokémon:", error));
    }

    return (
        <div>
            <h1>Alterar Seu Pokémon</h1>

            <label>ID do Pokémon a ser alterado:</label>
            <input 
                type="text" 
                value={id}
                onChange={digitarId}
            />
            <button onClick={buscarPokemon}>Buscar</button>

            {buscaConcluida && (
                <>
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        value={nome}
                        onChange={digitarNome} 
                    />

                    <label>PC:</label>
                    <input 
                        type="text" 
                        value={pc}
                        onChange={digitarPc} 
                    />

                    <label>Tipos (separados por vírgula):</label>
                    <input 
                        type="text" 
                        value={tipo}
                        onChange={digitarTipo} 
                    />

                    <button onClick={alterarPokemon}>Alterar</button>
                </>
            )}
        </div>
    );
}

export default AlterarSeuPokemon;
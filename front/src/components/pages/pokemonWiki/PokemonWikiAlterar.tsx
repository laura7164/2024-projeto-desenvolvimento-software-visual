import { useState } from "react";

function AlterarPokemonWiki() {
    const [nome, setNome] = useState<string>('');
    const [nomeAlterado, setNomeAlterado] = useState<string>(''); // Estado para nome alterado
    const [descricao, setDescricao] = useState<string>('');
    const [tipos, setTipos] = useState<string[]>([]);
    const [preEvolucoes, setPreEvolucoes] = useState<string[]>([]);
    const [evoluiPara, setEvoluiPara] = useState<string[]>([]);
    const [buscaConcluida, setBuscaConcluida] = useState<boolean>(false);

    function digitarNome(e: React.ChangeEvent<HTMLInputElement>) {
        setNome(e.target.value);
    }

    function digitarNomeAlterado(e: React.ChangeEvent<HTMLInputElement>) {
        setNomeAlterado(e.target.value);
    }

    function buscarPokemon() {
        fetch(`http://localhost:5244/api/pokemon_wiki/buscar/${nome}`)
            .then(resposta => {
                if (resposta.ok) {
                    return resposta.json();
                } else {
                    throw new Error("Pokémon não encontrado.");
                }
            })
            .then(pokemon => {
                setNomeAlterado(pokemon.nome); // Preencher com o nome original, caso queira alterar
                setDescricao(pokemon.descricao || '');
                setTipos(pokemon.tipos || []);
                setPreEvolucoes(pokemon.preEvolucoes || []);
                setEvoluiPara(pokemon.evoluiPara || []);
                setBuscaConcluida(true); // Confirma que a busca foi concluída com sucesso
            })
            .catch(error => {
                console.error("Erro ao buscar Pokémon:", error);
                alert("Pokémon não encontrado!");
                setBuscaConcluida(false);
            });
    }

    function alterarPokemon() {
        const pokemonAlterado = {
            nome: nomeAlterado, // Enviar o nome alterado
            descricao,
            tipos,
            preEvolucoes,
            evoluiPara
        };

        fetch(`http://localhost:5244/api/pokemon_wiki/alterar/${nome}`, {
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
            setDescricao(pokemonAtualizado.descricao || '');
            setTipos(pokemonAtualizado.tipos || []);
            setPreEvolucoes(pokemonAtualizado.preEvolucoes || []);
            setEvoluiPara(pokemonAtualizado.evoluiPara || []);
        })
        .catch(error => console.error("Erro ao atualizar Pokémon:", error));
    }

    return (
        <div>
            <h1>Alterar Pokémon</h1>

            <label>Nome do Pokémon a ser alterado:</label>
            <input 
                type="text" 
                value={nome}
                onChange={digitarNome}
            />
            <button onClick={buscarPokemon}>Buscar</button>

            {buscaConcluida && (
                <>
                    <label>Nome Alterado:</label>
                    <input 
                        type="text" 
                        value={nomeAlterado}
                        onChange={digitarNomeAlterado} // Permite editar o nome
                    />

                    <label>Descrição:</label>
                    <textarea 
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />

                    <label>Tipos (separados por vírgula):</label>
                    <input 
                        type="text" 
                        value={tipos.join(', ')}
                        onChange={(e) => setTipos(e.target.value.split(',').map(tipo => tipo.trim()))}
                    />

                    <label>Pré-evoluções (separadas por vírgula):</label>
                    <input 
                        type="text" 
                        value={preEvolucoes.join(', ')}
                        onChange={(e) => setPreEvolucoes(e.target.value.split(',').map(preEvo => preEvo.trim()))}
                    />

                    <label>Evolui para (separados por vírgula):</label>
                    <input 
                        type="text" 
                        value={evoluiPara.join(', ')}
                        onChange={(e) => setEvoluiPara(e.target.value.split(',').map(evo => evo.trim()))}
                    />

                    <button onClick={alterarPokemon}>Alterar</button>
                </>
            )}
        </div>
    );
}

export default AlterarPokemonWiki;
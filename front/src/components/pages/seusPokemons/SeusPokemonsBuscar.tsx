import { useState } from "react";

function BuscarSeuPokemon() {   
    const [id, setId] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [pc, setPc] = useState<number | null>(null);
    const [tipos, setTipos] = useState<string[]>([]);

    function digitar(e: React.ChangeEvent<HTMLInputElement>) {
        setId(e.target.value);
    }

    function sairCaixaTexto() {
        console.log("ID do Pokémon buscado:", id);

        fetch(`http://localhost:5244/api/seu_pokemon/buscar/${id}`)
            .then(resposta => {
                console.log("Resposta da API:", resposta); 
                return resposta.json();
            })
            .then(pokemon => {
                console.log("Dados recebidos:", pokemon);  

                if (pokemon && pokemon.nome) {  
                    setNome(pokemon.nome || '');
                    setPc(pokemon.pc || null);
                    setTipos(pokemon.tipos || []);
                } else {
                    alert("Pokémon não encontrado!");
                    setNome('');
                    setPc(null);
                    setTipos([]);
                }
            })
            .catch(error => console.error("Erro ao buscar Pokémon:", error));
    }

    return (
        <div>
            <h1>Buscar seu Pokémon</h1>

            <input 
                type="text" 
                placeholder="Digite o ID do Pokémon"
                onChange={digitar}
                onBlur={sairCaixaTexto}
            />

            <button onClick={sairCaixaTexto}>Buscar</button>

            <p><strong>Nome:</strong> {nome}</p>
            <p><strong>PC:</strong> {pc}</p>
            <p><strong>Tipos:</strong> {tipos?.join(', ')}</p>
        </div>
    );
}

export default BuscarSeuPokemon;
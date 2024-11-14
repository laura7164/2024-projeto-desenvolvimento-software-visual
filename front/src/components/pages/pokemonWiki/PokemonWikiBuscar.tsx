import { useState } from "react";

function ConsultarPokemonWiki() {   
    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [tipos, setTipos] = useState<string[]>([]);
    const [preEvolucoes, setPreEvolucoes] = useState<string[]>([]);
    const [evoluiPara, setEvoluiPara] = useState<string[]>([]); 

    function digitar(e: React.ChangeEvent<HTMLInputElement>) {
        setNome(e.target.value);
    }

    function sairCaixaTexto() {
        console.log("Nome do Pokémon buscado:", nome);  // Log do nome do Pokémon

        // Atualizado para usar o endpoint /buscar
        fetch(`http://localhost:5244/api/pokemon_wiki/buscar/${nome}`)
            .then(resposta => {
                console.log("Resposta da API:", resposta);  // Log da resposta da API
                return resposta.json();
            })
            .then(pokemon => {
                console.log("Dados recebidos:", pokemon);  // Log dos dados recebidos

                if (pokemon && pokemon.nome) {  // Verifica se o Pokémon foi encontrado
                    setNome(pokemon.nome || '');
                    setDescricao(pokemon.descricao || '');
                    setTipos(pokemon.tipos || []);
                    setPreEvolucoes(pokemon.preEvolucoes || []);
                    setEvoluiPara(pokemon.evoluiPara || []);
                } else {
                    alert("Pokémon não encontrado!");
                    setDescricao('');
                    setTipos([]);
                    setPreEvolucoes([]);
                    setEvoluiPara([]);
                }
            })
            .catch(error => console.error("Erro ao buscar Pokémon:", error));
    }

    return (
        <div>
            <h1>Consultar Pokémon</h1>

            <input 
                type="text" 
                placeholder="Digite o nome do Pokémon"
                onChange={digitar}
                onBlur={sairCaixaTexto}
            />

            <button onClick={sairCaixaTexto}>Consultar</button>

            <p><strong>Nome:</strong> {nome}</p>
            <p><strong>Descrição:</strong> {descricao}</p>
            <p><strong>Tipos:</strong> {tipos?.join(', ')}</p>
            <p><strong>Pré-evoluções:</strong> {preEvolucoes?.join(', ')}</p>
            <p><strong>Evolui para:</strong> {evoluiPara?.join(', ')}</p>
        </div>
    );
}

export default ConsultarPokemonWiki;
import { useState } from "react";

function BuscarSeuPokemon() {
    const [id, setId] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [pc, setPc] = useState<number | null>(null);
    const [tipo, setTipo] = useState<string>(''); // Para armazenar o nome do tipo

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
                    setTipo(pokemon.tipo?.nome || ''); // Obtém o nome do tipo do objeto Tipo
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
            <p><strong>Tipo:</strong> {tipo}</p> {/* Exibe o nome do tipo */}
        </div>
    );
}

export default BuscarSeuPokemon;

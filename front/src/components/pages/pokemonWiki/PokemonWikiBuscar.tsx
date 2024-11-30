import { useState } from "react";

function BuscarPokemonWiki() {
    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [tipoId, setTipoId] = useState<number | null>(null);
    const [preEvolucoes, setPreEvolucoes] = useState<string>("");
    const [evoluiPara, setEvoluiPara] = useState<string>("");

    function digitar(e: React.ChangeEvent<HTMLInputElement>) {
        setNome(e.target.value);
    }

    function sairCaixaTexto() {
        console.log("Nome do Pokémon buscado:", nome);

        fetch(`http://localhost:5244/api/pokemon_wiki/buscar/${nome}`)
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error("Pokémon não encontrado!");
                }
                return resposta.json();
            })
            .then((pokemon) => {
                console.log("Dados recebidos:", pokemon);

                if (pokemon && pokemon.nome) {
                    setNome(pokemon.nome || "");
                    setDescricao(pokemon.descricao || "");
                    setTipoId(pokemon.tipoId || null);
                    setPreEvolucoes(pokemon.preEvolucoes.join(", ") || ""); // Array para string
                    setEvoluiPara(pokemon.evoluiPara.join(", ") || ""); // Array para string
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
        setDescricao("");
        setTipoId(null);
        setPreEvolucoes("");
        setEvoluiPara("");
    }

    return (
        <div>
            <h1>Buscar Pokémon</h1>

            <input
                type="text"
                placeholder="Digite o nome do Pokémon"
                onChange={digitar}
                onBlur={sairCaixaTexto}
            />

            <button onClick={sairCaixaTexto}>Buscar</button>

            <p><strong>Nome:</strong> {nome}</p>
            <p><strong>Descrição:</strong> {descricao}</p>
            <p><strong>Tipo ID:</strong> {tipoId}</p>
            <p><strong>Pré-evoluções:</strong> {preEvolucoes}</p>
            <p><strong>Evolui para:</strong> {evoluiPara}</p>
        </div>
    );
}

export default BuscarPokemonWiki;

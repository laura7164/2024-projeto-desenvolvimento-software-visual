import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SeusPokemonsAlterar = () => {
    const { idParam } = useParams(); // Captura o ID da URL
    const [nome, setNome] = useState("");
    const [pc, setPc] = useState<number>(0);
    const [tipoId, setTipoId] = useState("");

    useEffect(() => {
        console.log("Parâmetros capturados:", idParam);

        if (!idParam) {
            alert("ID do Pokémon não foi encontrado na URL.");
            return;
        }

        axios
            .get(`http://localhost:5244/api/seu_pokemon/buscar/${idParam}`)
            .then((resposta) => {
                console.log("Resposta da API:", resposta.data);
                setNome(resposta.data.nome || "");
                setPc(Number(resposta.data.pc) || 0);
                setTipoId(resposta.data.tipoId?.toString() || "");
            })
            .catch((error) => {
                console.error("Erro ao buscar Pokémon:", error.response?.data || error.message);
                alert("Pokémon não encontrado.");
            });
    }, [idParam]);

    const alterarSeuPokemon = async () => {
        const pokemonData = {
            nome,
            pc,
            tipoId: parseInt(tipoId, 10),
        };

        if (!nome || pc <= 0 || !tipoId) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:5244/api/seu_pokemon/alterar/${idParam}`,
                pokemonData
            );

            if (response.status === 200) {
                alert("Pokémon alterado com sucesso!");
            } else {
                alert("Erro ao alterar Pokémon.");
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error("Erro ao alterar Pokémon:", error.response?.data || error.message);
                alert(error.response?.data || "Erro ao salvar as alterações. Tente novamente.");
            } else {
                console.error("Erro desconhecido ao alterar Pokémon:", error);
                alert("Erro inesperado. Tente novamente.");
            }
        }
    };

    return (
        <div>
            <h2>Alterar Seu Pokémon</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    alterarSeuPokemon();
                }}
            >
                <label>
                    Nome:
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </label>
                <br />

                <label>
                    PC (Pontos de Combate):
                    <input
                        type="number"
                        value={pc}
                        onChange={(e) => setPc(Number(e.target.value))}
                        required
                    />
                </label>
                <br />

                <label>
                    Tipo:
                    <select
                        value={tipoId}
                        onChange={(e) => setTipoId(e.target.value)}
                        required
                    >
                        <option value="">Selecione um tipo</option>
                        <option value="1">Normal</option>
                        <option value="2">Água</option>
                        <option value="3">Fogo</option>
                        <option value="4">Planta</option>
                        <option value="5">Elétrico</option>
                        <option value="6">Inseto</option>
                        <option value="7">Lutador</option>
                        <option value="8">Gelo</option>
                        <option value="9">Fada</option>
                        <option value="10">Dragão</option>
                        <option value="11">Venenoso</option>
                        <option value="12">Sombrio</option>
                        <option value="13">Fantasma</option>
                    </select>
                </label>
                <br />

                <button type="submit">Alterar Pokémon</button>
            </form>
        </div>
    );
};

export default SeusPokemonsAlterar;

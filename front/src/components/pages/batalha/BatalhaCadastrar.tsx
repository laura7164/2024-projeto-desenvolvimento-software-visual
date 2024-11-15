import React, { useState } from 'react';

function CadastrarBatalha() {
    const [pokemonId1, setPokemonId1] = useState<number | ''>('');
    const [pokemonId2, setPokemonId2] = useState<number | ''>('');
    const [titulo, setTitulo] = useState<string>('');
    const [mensagem, setMensagem] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (pokemonId1 === '' || pokemonId2 === '' || titulo.trim() === '') {
            setMensagem('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const batalha = {
            titulo,
        };

        fetch(`http://localhost:5244/api/batalha/cadastrar/${pokemonId1}/${pokemonId2}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(batalha)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao cadastrar a batalha: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                // Lógica para determinar o resultado
                const { pokemon1, pokemon2 } = data;

                let resultado: string;
                if (pokemon1.pc === pokemon2.pc) {
                    resultado = 'Empate! Nenhum dos Pokémons venceu.';
                } else {
                    const vencedor = pokemon1.pc > pokemon2.pc ? pokemon1.nome : pokemon2.nome;
                    resultado = `Batalha cadastrada com sucesso! Vencedor: ${vencedor}`;
                }

                setMensagem(resultado);
                setPokemonId1('');
                setPokemonId2('');
                setTitulo('');
            })
            .catch(error => {
                console.error('Erro:', error);
                setMensagem('Erro ao cadastrar a batalha. Verifique os IDs dos Pokémons e tente novamente.');
            });
    }

    return (
        <div>
            <h2>Cadastrar Batalha</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Título da Batalha:
                    <input
                        type="text"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    ID do Pokémon 1:
                    <input
                        type="number"
                        value={pokemonId1}
                        onChange={e => setPokemonId1(Number(e.target.value))}
                        required
                    />
                </label>
                <br />
                <label>
                    ID do Pokémon 2:
                    <input
                        type="number"
                        value={pokemonId2}
                        onChange={e => setPokemonId2(Number(e.target.value))}
                        required
                    />
                </label>
                <br />
                <button type="submit">Cadastrar Batalha</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}

export default CadastrarBatalha;
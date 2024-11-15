import React, { useState } from 'react';
import { SeusPokemons } from '../../../models/SeusPokemons';

function CadastrarSeuPokemon() {
    const [id, setId] = useState<number>();
    const [nome, setNome] = useState<string>('');
    const [pc, setPc] = useState<number>();
    const [tipos, setTipos] = useState<string[]>([]);

    function handleSubmit(e: any) {
        e.preventDefault();

        const novoPokemon= {
            id,
            nome,
            pc,
            tipos
        };

        fetch('http://localhost:5244/api/seu_pokemon/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoPokemon)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setId(0);
                setNome('');
                setPc(0);
                setTipos([]);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    };

    return (
        <div>
            <h2>Cadastrar seu novo pokemon</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
                </label>
                <label>
                    Pc:
                    <input type="number" value={pc || ''} onChange={e => setPc(Number(e.target.value))} required />
                </label>
                <label>
                    Tipos:
                    <input type="string" value={tipos} onChange={e => setTipos(Array(e.target.value))} required />
                </label>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );

}
export default CadastrarSeuPokemon;
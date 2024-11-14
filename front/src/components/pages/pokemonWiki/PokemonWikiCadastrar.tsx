import React, { useState } from 'react';
import { PokemonWiki } from '../../../models/PokemonWiki';

function CadastroPokemonWiki() {
    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [tipos, setTipos] = useState<string[]>([]);
    const [preEvolucoes, setpreEvolucoes] = useState<string[]>([]);
    const [evoluirPara, setevoluirPara] = useState<string[]>([]);

    function handleSubmit(e: any) {
        e.preventDefault();

        const novoProduto = {
            nome,
            descricao,
            tipos,
            preEvolucoes,
            evoluirPara
        };

        fetch('http://localhost:5244/api/pokemon_wiki/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoProduto)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setNome('');
                setDescricao('');
                setTipos([]);
                setpreEvolucoes([]);
                setevoluirPara([]);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    };

    return (
        <div>
            <h2>Cadastrar novo pokemon na Pokedex</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
                </label>
                <label>
                    Descrição:
                    <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} required />
                </label>
                <label>
                    Tipos:
                    <input type="string" value={tipos} onChange={e => setTipos(Array(e.target.value))} required />
                </label>
                <label>
                    PreEvolucoes:
                    <input type="string" value={preEvolucoes} onChange={e => setpreEvolucoes(Array(e.target.value))} required />
                </label>
                <label>
                    EvoluirPara:
                    <input type="string" value={evoluirPara} onChange={e => setevoluirPara(Array(e.target.value))} required />
                </label>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );

}
export default CadastroPokemonWiki;
import React, { useState, useEffect } from 'react';
import { Batalha } from '../../../models/Batalha';

function ListarBatalhas() {
    const [batalhas, setBatalhas] = useState<Batalha[]>([]);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:5244/api/batalha/listar')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setBatalhas(data);
                setErro(null);
            })
            .catch(error => {
                console.error('Erro:', error);
                setErro('Nenhuma batalha encontrada ou ocorreu um erro ao carregar as batalhas.');
            });
    }, []);

    return (
        <div>
            <h1>Listagem de Batalhas</h1>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            {!erro && batalhas.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Pokémon 1 ID</th>
                            <th>Pokémon 2 ID</th>
                            <th>Vencedor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {batalhas.map(batalha => (
                            <tr key={batalha.batalhaId}>
                                <td>{batalha.batalhaId}</td>
                                <td>{batalha.titulo}</td>
                                <td>{batalha.pokemon1Id}</td>
                                <td>{batalha.pokemon2Id}</td>
                                <td>{batalha.vencedor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ListarBatalhas;
import React, { useState, useEffect } from 'react';
import { SeusPokemons } from '../../../models/SeusPokemons';

function ListarSeusPokemons() {
    const [pokemons, setPokemons] = useState<SeusPokemons[]>([]);

    useEffect(() => {
        fetch('http://localhost:5244/api/seu_pokemon/listar') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setPokemons(data);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }, []);

    return (  
        <div> 
            <h1>Listagem dos seus Pokémons</h1>
            <table>
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Nome </th>
                        <th> Pc </th>
                        <th> Tipos </th>
                    </tr>
                </thead>
                <tbody>
                    {pokemons.map(pokemon => (
                        <tr key={pokemon.seusPokemonsId}> {}
                            <td>{pokemon.seusPokemonsId}</td> {}
                            <td>{pokemon.nome}</td>
                            <td>{pokemon.pc}</td>
                            <td>{pokemon.tipos.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> 
    );
}

export default ListarSeusPokemons;
import React, { useState, useEffect } from 'react';
import { PokemonWiki } from '../../../models/PokemonWiki';

function ListaPokemonWiki() {
    const [pokemons, setPokemons] = useState<PokemonWiki[]>([]);

    useEffect(() => {
        fetch('http://localhost:5244/api/pokemon_wiki/listar') 
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
            <h1>Listagem de Pokémons</h1>
            <table>
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Nome </th>
                        <th> Descrição </th>
                        <th> Tipos </th>
                        <th> Pré-evoluções </th>
                        <th> Evolui Para </th>
                    </tr>
                </thead>
                <tbody>
                    {pokemons.map(pokemon => (
                        <tr key={pokemon.pokemonWikiId}> {/* Altere para pokemonWikiId */}
                            <td>{pokemon.pokemonWikiId}</td> {/* Alterado para pokemonWikiId */}
                            <td>{pokemon.nome}</td>
                            <td>{pokemon.descricao}</td>
                            <td>{pokemon.tipos.join(', ')}</td>
                            <td>{pokemon.preEvolucoes.join(', ')}</td>
                            <td>{pokemon.evoluiPara.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> 
    );
}

export default ListaPokemonWiki;

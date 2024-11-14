export interface PokemonWiki {
    pokemonWikiId?: string;
    nome: string;
    descricao: string;
    tipos: string[];
    preEvolucoes: string[];
    evoluiPara: string[];
    criadoEm: Date;
}
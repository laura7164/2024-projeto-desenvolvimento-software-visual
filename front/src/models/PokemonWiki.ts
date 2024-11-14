export interface PokemonWiki {
    //alterar para list
    pokemonWikiId?: string;
    nome: string;
    descricao: string;
    tipos: string[];
    preEvolucoes: string[];
    evoluiPara: string[];
    criadoEm: Date;
}
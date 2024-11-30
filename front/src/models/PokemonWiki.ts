import { Tipo } from "./Tipo";

export interface PokemonWiki {
    pokemonWikiId?: string;
    nome: string;
    descricao: string;
    preEvolucoes: string[];
    evoluiPara: string[];
    criadoEm?: Date;
    tipoId: number;
    tipo?: Tipo;
}
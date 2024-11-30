import { Tipo } from "./Tipo";

export interface SeusPokemons {
    seusPokemonsId?: string;
    nome: string;
    pc: number;
    criadoEm: Date;
    tipoId: number;
    tipo?: Tipo;
}
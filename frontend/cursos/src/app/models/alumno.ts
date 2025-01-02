import { Generic } from "./generic";

export type ColumnKeys<T> = Array<keyof T>;

export class Alumno implements Generic {
    id: number = 0;
    nombre!: string;
    apellido!: string;
    email!:string;
    createAt!: string;
    fotoHashCode: number | null = 0;
}

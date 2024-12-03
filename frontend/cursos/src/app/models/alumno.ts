export type ColumnKeys<T> = Array<keyof T>;

export class Alumno {
    id: number = 0;
    nombre!: string;
    apellido!: string;
    email!:string;
    createAt!: string;
    fotoHashCode!: number;
    action!: string;
}

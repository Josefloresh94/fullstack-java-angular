import { Pregunta } from './pregunta';
import { Asignatura } from './asignatura';

export class Examen {
    id: number = 0;
    nombre!: string;
    createAt!: string;
    preguntas: Pregunta[] = [];
    asignatura!: Asignatura;
    respondido!: boolean;
}

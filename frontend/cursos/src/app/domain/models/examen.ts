import { Asignatura } from './asignatura';
import { Pregunta } from './pregunta';

export class Examen {
  id = 0;
  nombre!: string;
  createAt!: string;
  preguntas: Pregunta[] = [];
  asignaturaPadre!: Asignatura;
  asignaturaHija!: Asignatura;
  respondido!: boolean;
}

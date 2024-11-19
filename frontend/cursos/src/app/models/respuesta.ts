import { Alumno } from './alumno';
import { Pregunta } from './pregunta';

export class Respuesta {
    id: number = 0;
    texto!: string;
    alumno!: Alumno;
    pregunta!: Pregunta;
}

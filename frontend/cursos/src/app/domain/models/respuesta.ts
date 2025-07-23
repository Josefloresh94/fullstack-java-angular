import { Alumno } from './alumno';
import { Pregunta } from './pregunta';

export class Respuesta {
  id = 0;
  texto!: string;
  alumno!: Alumno;
  pregunta!: Pregunta;
}

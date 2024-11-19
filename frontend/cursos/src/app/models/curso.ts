import { Alumno } from './alumno';
import { Examen } from './examen';

export class Curso {
    id: number = 0;
    nombre!: string;
    createAt!: string;
    alumnos: Alumno[] = [];
    examenes: Examen[] = [];
}

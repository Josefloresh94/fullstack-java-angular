import { Generic } from './generic';

export class Alumno implements Generic {
  id = 0;
  nombre!: string;
  apellido!: string;
  email!: string;
  createAt!: string;
  fotoHashCode: number | null = 0;
}

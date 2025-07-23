export class Asignatura {
  id = 0;
  nombre!: string;
  padre!: Asignatura;
  hijos: Asignatura[] = [];
}

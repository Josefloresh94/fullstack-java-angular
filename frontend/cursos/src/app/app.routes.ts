import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/alumnos',
  },
  {
    path: 'alumnos',
    loadComponent: () =>
      import('./presentation/features/alumnos/alumnos').then((m) => m.Alumnos),
  },
  {
    path: 'alumnos/form',
    loadComponent: () =>
      import(
        './presentation/features/alumnos/pages/form-alumno/form-alumno'
      ).then((m) => m.FormAlumno),
  },
  {
    path: 'alumnos/form/:id',
    loadComponent: () =>
      import(
        './presentation/features/alumnos/pages/form-alumno/form-alumno'
      ).then((m) => m.FormAlumno),
  },
  {
    path: 'cursos',
    loadComponent: () =>
      import('./presentation/features/cursos/cursos').then((m) => m.Cursos),
  },
  {
    path: 'cursos/form',
    loadComponent: () =>
      import('./presentation/features/cursos/pages/form-curso/form-curso').then(
        (m) => m.FormCurso,
      ),
  },
  {
    path: 'cursos/form/:id',
    loadComponent: () =>
      import('./presentation/features/cursos/pages/form-curso/form-curso').then(
        (m) => m.FormCurso,
      ),
  },
  {
    path: 'cursos/asignar-alumnos/:id',
    loadComponent: () =>
      import(
        './presentation/features/cursos/pages/asignar-alumnos/asignar-alumnos'
      ).then((m) => m.AsignarAlumnos),
  },
  {
    path: 'examenes',
    loadComponent: () =>
      import('./presentation/features/examenes/examenes').then(
        (m) => m.Examenes,
      ),
  },
  {
    path: 'examenes/form',
    loadComponent: () =>
      import(
        './presentation/features/examenes/pages/form-examen/form-examen'
      ).then((m) => m.FormExamen),
  },
  {
    path: 'examenes/form/:id',
    loadComponent: () =>
      import(
        './presentation/features/examenes/pages/form-examen/form-examen'
      ).then((m) => m.FormExamen),
  },
];

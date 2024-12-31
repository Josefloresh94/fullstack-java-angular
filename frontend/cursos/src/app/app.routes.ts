import { Routes } from '@angular/router';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { AlumnosFormComponent } from './components/alumnos/alumnos-form/alumnos-form.component';
import { CursoFormComponent } from './components/cursos/curso-form/curso-form.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/alumnos'},
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'alumnos/form', component: AlumnosFormComponent },
  { path: 'alumnos/form/:id', component: AlumnosFormComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'cursos/form', component: CursoFormComponent},
  { path: 'cursos/form/:id', component: CursoFormComponent},
  { path: 'examenes', component: ExamenesComponent},
  // { path: 'examenes/form', component: ExamenFormComponent},
  // { path: 'examenes/form/:id', component: ExamenFormComponent},
  // { path: 'cursos/asignar-alumnos/:id', component: AsignarAlumnosComponent},
];

import { Routes } from '@angular/router';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { ExamenesComponent } from './components/examenes/examenes.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/alumnos'
    },
    { path: 'alumnos', component: AlumnosComponent },
    { path: 'cursos', component: CursosComponent },
    { path: 'examenes', component: ExamenesComponent },
];
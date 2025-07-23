import { environment } from '@environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Alumno } from '@domain/models/alumno';
import { Curso } from '@domain/models/curso';
import { Observable } from 'rxjs';
import { CommonService } from './common-service';

@Injectable({
  providedIn: 'root',
})
export class CursoService extends CommonService<Curso> {
  protected override baseEndpoint = environment.BASE_ENDPOINT + '/cursos';
  protected override http = inject(HttpClient);

  asignarAlumnos(curso: Curso, alumnos: Alumno[]): Observable<Curso> {
    return this.http.put<Curso>(
      `${this.baseEndpoint}/${curso.id}/asignar-alumnos`,
      alumnos,
      { headers: this.cabeceras },
    );
  }

  eliminarAlumno(curso: Curso, alumno: Alumno): Observable<Curso> {
    return this.http.put<Curso>(
      `${this.baseEndpoint}/${curso.id}/eliminar-alumno`,
      alumno,
      { headers: this.cabeceras },
    );
  }
}

import { inject, Injectable } from '@angular/core';
import { CommonService } from './common-service';
import { Alumno } from '@domain/models/alumno';
import { environment } from '@environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService extends CommonService<Alumno> {
  protected override baseEndpoint = environment.BASE_ENDPOINT + '/alumnos';
  protected override http = inject(HttpClient);

  public crearConFoto(alumno: Alumno, archivo: File): Observable<Alumno> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', alumno.nombre);
    formData.append('apellido', alumno.apellido);
    formData.append('email', alumno.email);
    return this.http.post<Alumno>(
      this.baseEndpoint + '/crear-con-foto',
      FormData,
    );
  }

  public editarConFoto(alumno: Alumno, archivo: File): Observable<Alumno> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', alumno.nombre);
    formData.append('apellido', alumno.apellido);
    formData.append('email', alumno.email);
    return this.http.put<Alumno>(
      `${this.baseEndpoint}/editar-con-foto/${alumno.id}`,
      FormData,
    );
  }

  public filtrarPorNombre(nombre: string): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.baseEndpoint}/filtrar/${nombre}`);
  }
}

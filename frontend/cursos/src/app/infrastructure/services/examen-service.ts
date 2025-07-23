import { environment } from '@environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Asignatura } from '@domain/models/asignatura';
import { Examen } from '@domain/models/examen';
import { Observable } from 'rxjs';
import { CommonService } from './common-service';

@Injectable({
  providedIn: 'root',
})
export class ExamenService extends CommonService<Examen> {
  protected override baseEndpoint = environment.BASE_ENDPOINT + '/examenes';
  protected override http = inject(HttpClient);

  public findAllAsignatura(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.baseEndpoint}/asignaturas`);
  }
}

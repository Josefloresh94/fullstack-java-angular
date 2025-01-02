import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Examen } from '../models/examen';
import { BASE_ENDPOINT } from '../config/app';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asignatura } from '../models/asignatura';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends CommonService<Examen> {

  protected override baseEndpoint = BASE_ENDPOINT + '/examenes';

  constructor(http: HttpClient) {
    super(http);
  }
  public findAllAsignatura(): Observable<Asignatura[]>{
    return this.http.get<Asignatura[]>(`${this.baseEndpoint}/asignaturas`);
  }
}

import { Component } from '@angular/core';
import { CommonListarComponent } from '../common-listar.component';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';
import { BASE_ENDPOINT } from '../../config/app';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alumnos',
  imports: [RouterModule, DatePipe, MatPaginatorModule, MatIconModule],
  templateUrl: './alumnos.component.html'
})
export class AlumnosComponent extends CommonListarComponent<Alumno ,AlumnoService> {
  baseEndpoint = BASE_ENDPOINT + '/alumnos';

  constructor(service: AlumnoService) {
    super(service);
    this.titulo = 'Listado de Alumnos';
    this.nombreModel = Alumno.name;
  }

}

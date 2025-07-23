import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { Alumno } from '@domain/models/alumno';
import { environment } from '@environments/environment.development';
import { AlumnoService } from '@infrastructure/services/alumno-service';
import { CommonListar } from '@shared/directives/common-listar';

@Component({
  selector: 'app-alumnos',
  imports: [RouterLink, MatIconModule, DatePipe, MatPaginatorModule],
  templateUrl: './alumnos.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Alumnos
  extends CommonListar<Alumno, AlumnoService>
  implements OnInit
{
  baseEndpoint = environment.BASE_ENDPOINT + '/alumnos';
  override service = inject(AlumnoService);
  override pageSizeOptions = signal([5, 10, 25, 100]);

  constructor() {
    super();
    this.titulo = 'Listado de Alumnos';
    this.nombreModel = Alumno.name;
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
  }
}

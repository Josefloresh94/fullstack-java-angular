import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { Curso } from '@domain/models/curso';
import { environment } from '@environments/environment.development';
import { CursoService } from '@infrastructure/services/curso-service';
import { CommonListar } from '@shared/directives/common-listar';

@Component({
  selector: 'app-cursos',
  imports: [MatIconModule, DatePipe, RouterLink, MatPaginatorModule],
  templateUrl: './cursos.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cursos
  extends CommonListar<Curso, CursoService>
  implements OnInit
{
  baseEndpoint = environment.BASE_ENDPOINT + '/cursos';
  override service = inject(CursoService);
  constructor() {
    super();
    this.titulo = 'Listado de cursos';
    this.nombreModel = Curso.name;
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
  }
}

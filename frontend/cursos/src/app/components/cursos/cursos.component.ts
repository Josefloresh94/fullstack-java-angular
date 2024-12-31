import { Component, OnInit } from '@angular/core';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';
import { CommonListarComponent } from '../common-listar.component';
import { RouterModule } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'cursos',
    imports: [RouterModule, MatPaginator, DatePipe],
    templateUrl: './cursos.component.html'
})
export class CursosComponent extends CommonListarComponent<Curso, CursoService> implements OnInit {

  constructor(service: CursoService) {
    super(service);
    this.titulo = 'Listado de cursos';
    this.nombreModel = Curso.name;
  }
}

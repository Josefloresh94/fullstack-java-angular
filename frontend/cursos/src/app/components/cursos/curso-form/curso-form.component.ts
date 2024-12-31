import { Component } from '@angular/core';
import { CommonFormComponent } from '../../common-form.component';
import { Curso } from '../../../models/curso';
import { CursoService } from '../../../services/curso.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-curso-form',
  imports: [RouterModule, FormsModule, MatIconModule],
  templateUrl: './curso-form.component.html'
})
export class CursoFormComponent extends CommonFormComponent<Curso, CursoService> {

  constructor(service: CursoService,
    router: Router,
    route: ActivatedRoute) {
      super(service, router, route);
      this.titulo = 'Crear Curso';
      this.model = new Curso();
      this.redirect = '/cursos';
      this.nombreModel = Curso.name;
    }
}

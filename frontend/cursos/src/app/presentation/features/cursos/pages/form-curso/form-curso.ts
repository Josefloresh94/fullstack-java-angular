import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Curso } from '@domain/models/curso';
import { CursoService } from '@infrastructure/services/curso-service';
import { CommonForm } from '@shared/directives/common-form';

@Component({
  selector: 'app-form-curso',
  imports: [MatIconModule, RouterLink, FormsModule],
  templateUrl: './form-curso.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCurso extends CommonForm<Curso, CursoService> {
  protected override service = inject(CursoService);
  protected override router = inject(Router);
  protected override route = inject(ActivatedRoute);

  constructor() {
    super();
    this.titulo.set('Crear Curso');
    this.model.set(new Curso());
    this.redirect = '/cursos';
    this.nombreModel = Curso.name;
  }
}

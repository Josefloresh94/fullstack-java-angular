import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { Examen } from '@domain/models/examen';
import { environment } from '@environments/environment.development';
import { ExamenService } from '@infrastructure/services/examen-service';
import { CommonListar } from '@shared/directives/common-listar';

@Component({
  selector: 'app-examenes',
  imports: [MatPaginatorModule, MatIconModule, DatePipe, RouterLink],
  templateUrl: './examenes.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Examenes extends CommonListar<Examen, ExamenService> {
  baseEndpoint = environment.BASE_ENDPOINT + '/examenes';
  protected override service = inject(ExamenService);
  constructor() {
    super();
    this.titulo = 'Listado de Examenes';
    this.nombreModel = Examen.name;
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
  }
}

import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { Examen } from '../../models/examen';
import { ExamenService } from '../../services/examen.service';
import { CommonListarComponent } from '../common-listar.component';

@Component({
    selector: 'examenes',
    imports: [RouterModule, DatePipe, MatPaginatorModule, MatIconModule],
    templateUrl: './examenes.component.html'
})
export class ExamenesComponent  extends CommonListarComponent<Examen, ExamenService> {
  constructor(service: ExamenService) {
    super(service);
    this.nombreModel = Examen.name;
  }
}

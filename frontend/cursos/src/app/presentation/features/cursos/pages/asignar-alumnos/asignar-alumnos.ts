import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-asignar-alumnos',
  imports: [
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatTabsModule,
    MatFormFieldModule,
  ],
  templateUrl: './asignar-alumnos.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsignarAlumnos {}

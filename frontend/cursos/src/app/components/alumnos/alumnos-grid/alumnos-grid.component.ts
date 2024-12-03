import { Component, OnInit, effect, inject, input, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule, } from '@angular/material/table';
import { AlumnoService } from '../../../services/alumno.service';
import Swal from 'sweetalert2';
import { Alumno } from '../../../models/alumno';
import { FilterComponent } from '../filter/filter.component';
import { RouterModule } from '@angular/router';
const MATERIAL_MODULES = [MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, MatIconModule];

@Component({
  selector: 'app-alumnos-grid',
  imports: [MATERIAL_MODULES, FilterComponent, RouterModule],
  templateUrl: './alumnos-grid.component.html',
  styleUrl: './alumnos-grid.component.css'
})
export class AlumnosGridComponent<T> implements OnInit {
  displayedColumns = input.required<string[]>();
  data = input.required<T[]>();
  sortableColumns = input<string[]>([]);

  dataSource = new MatTableDataSource<T>();
  valueToFilter = signal('');

  private readonly _sort = viewChild.required<MatSort>(MatSort);
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);
  private readonly _service = inject(AlumnoService);

  constructor() {
    effect(() => {
      if (this.valueToFilter()) {
        this.dataSource.filter = this.valueToFilter();
      } else {
        this.dataSource.filter = '';
      }

      if (this.data()) {
        this.dataSource.data = this.data();
      }
    })
  }

  ngOnInit(): void {
    this.dataSource.data = this.data();
    this.dataSource.sort = this._sort()
    this.dataSource.paginator = this._paginator()
  }

  public eliminar(alumno: Alumno):void{
    Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea eliminar a ${alumno.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this._service.eliminar(alumno.id).subscribe({
          next: () => {
            Swal.fire('Eliminado:', `Alumno ${alumno.nombre} eliminado con éxito`, 'success');
          }
        });
      }
    });
  }
}

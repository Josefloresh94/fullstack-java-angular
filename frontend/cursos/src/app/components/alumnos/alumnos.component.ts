import { Component, OnInit, viewChild, ViewChild } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2'
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule, } from '@angular/material/table';

@Component({
  selector: 'alumnos',
  standalone: true,
  imports: [RouterModule, MatPaginatorModule, CommonModule],
  templateUrl: './alumnos.component.html'
})
export class AlumnosComponent<T> implements OnInit{

  titulo: string = 'Listado de Alumnos';
  alumnos: Alumno[] = [];
  dataSource = new MatTableDataSource<T>();
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);
  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 4;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private service: AlumnoService){
  }

  ngOnInit(): void {
    this.dataSource.paginator = this._paginator()

  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    // this.calcularRangos();
  }

  // private calcularRangos(){
  //   this.service.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString())
  //   .subscribe(p =>
  //     {
  //       this.alumnos = p.content as Alumno[];
  //       this.totalRegistros = p.totalElements as number;
  //       if (this._paginator._intl) {
  //         this._paginator._intl.itemsPerPageLabel = 'Registros por página:';
  //       }
  //     });
  // }

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
        this.service.eliminar(alumno.id).subscribe(() => {
          // this.alumnos = this.alumnos.filter(a => a !== alumno);
          // this.calcularRangos();
          Swal.fire('Eliminado:', `Alumno ${alumno.nombre} eliminado con éxito`, 'success');
        });
      }
    });
  }
}

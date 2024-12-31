import { Directive, OnInit, ViewChild } from "@angular/core";
import Swal from 'sweetalert2'
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Generic } from "../models/generic";
import { CommonService } from "../services/common.service";
@Directive()
export abstract class CommonListarComponent<E extends Generic, S extends CommonService<E>> implements OnInit {
  titulo!: string;
  lista: E[] = [];
  protected nombreModel!: string;

  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 4;
  pageSizeOptions: number[] = [3, 5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(protected service: S) { }

  ngOnInit(): void {
    this.calcularRangos();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    }
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangos();
  }

  private calcularRangos(){
    this.service.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString())
    .subscribe({
      next: (response) =>
        {
          this.lista = response.content as E[];
          this.totalRegistros = response.totalElements as number;
        },
        error: (err) =>
          {
            console.error('Error fetching data:', err);
            Swal.fire('Error', 'Error al cargar los datos', 'error');
          }
    });
  }


  public eliminar(e: E): void{

    Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea eliminar a ${e.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.service.eliminar(e.id).subscribe(() => {
          this.calcularRangos();
          Swal.fire('Eliminado:', `${this.nombreModel} ${e.nombre} eliminado con éxito`, 'success');
        });
      }
    });

  }
}

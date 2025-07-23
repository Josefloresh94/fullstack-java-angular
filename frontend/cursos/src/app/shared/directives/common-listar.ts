import {
  AfterViewInit,
  computed,
  DestroyRef,
  Directive,
  effect,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Generic } from '@domain/models/generic';
import { CommonService } from '@infrastructure/services/common-service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { toast } from 'ngx-sonner';
import { firstValueFrom } from 'rxjs';

@Directive({
  selector: '[appCommonListar]',
})
export abstract class CommonListar<
    E extends Generic,
    S extends CommonService<E>,
  >
  implements OnInit, AfterViewInit
{
  titulo!: string;
  lista = signal<E[]>([]);
  protected nombreModel!: string;
  protected service!: S;
  totalRegistros = signal<number>(0);
  paginaActual = signal<number>(0);
  totalPorPagina = signal<number>(5);
  pageSizeOptions = signal<number[]>([5, 10, 25, 100]);

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    if (paginator) {
      this.paginator = paginator;
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator.page.subscribe((event: PageEvent) => {
        this.paginar(event);
      });
    }
  }
  private paginator!: MatPaginator;

  readonly cargando = signal<boolean>(false);
  readonly tieneRegistros = computed(() => this.lista().length > 0);

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Effect para recargar datos cuando cambie la paginación
    effect(() => {
      const pagina = this.paginaActual();
      const tamano = this.totalPorPagina();

      if (pagina >= 0 && tamano > 0) {
        this.calcularRangos();
      }
    });
  }

  ngOnInit(): void {
    this.calcularRangos();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    }
  }

  paginar(event: PageEvent): void {
    this.paginaActual.set(event.pageIndex);
    this.totalPorPagina.set(event.pageSize);
  }

  private async calcularRangos() {
    this.cargando.set(true);

    try {
      const response = await firstValueFrom(
        this.service.listarPaginas(
          this.paginaActual().toString(),
          this.totalPorPagina().toString(),
        ),
      );

      this.lista.set(response.content as E[]);
      this.totalRegistros.set(response.totalElements as number);

      // Asegurarse de que el paginador se actualice
      if (this.paginator) {
        this.paginator.pageIndex = this.paginaActual();
        this.paginator.pageSize = this.totalPorPagina();
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      toast.error(`Error al cargar los registros de ${this.nombreModel}`);
    } finally {
      this.cargando.set(false);
    }
  }

  public async eliminar(e: E): Promise<void> {
    toast(`CUIDADO: ¿Seguro que desea eliminar a ${e.nombre}?`, {
      action: {
        label: 'Eliminar',
        onClick: async () => {
          try {
            await firstValueFrom(this.service.eliminar(e.id));
            toast.success(
              `${this.nombreModel} ${e.nombre} eliminado con éxito`,
            );
            this.calcularRangos();
          } catch (err) {
            console.error('Error al eliminar:', err);
            toast.error(`Error al eliminar ${this.nombreModel}`);
          }
        },
      },
    });
  }
}

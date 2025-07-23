/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DestroyRef,
  Directive,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Generic } from '@domain/models/generic';
import { CommonService } from '@infrastructure/services/common-service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';

@Directive({
  selector: '[appCommonForm]',
})
export abstract class CommonForm<E extends Generic, S extends CommonService<E>>
  implements OnInit
{
  titulo = signal<string>('');
  model = signal<E | null>(null);
  error = signal<any>(null);
  protected readonly loadingSignal = signal<boolean>(false);
  protected redirect!: string;
  protected nombreModel!: string;
  protected service!: S;
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  constructor() {
    // Effect para limpiar errores cuando el modelo cambia
    effect(() => {
      const model = this.model();
      if (model) {
        this.error.set(null);
      }
    });
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(async (params) => {
        const idParam = params.get('id');
        const id: number = idParam ? +idParam : 0;
        if (id) {
          try {
            this.service.ver(id).subscribe((m) => {
              this.model.set(m);
              this.titulo.set('Editar ' + this.nombreModel);
            });
          } catch (err: any) {
            this.error.set(err.error);
            toast.error('Error al cargar el registro');
          } finally {
            this.loadingSignal.set(false);
          }
        }
      });
  }

  public async crear(): Promise<void> {
    const currentModel = this.model();
    if (!currentModel) return;

    try {
      this.loadingSignal.set(true);
      this.error.set(null);
      const result = await firstValueFrom(this.service.crear(currentModel));

      toast.success(
        `Nuevo ${this.nombreModel}: ${result.nombre} creado con éxito`,
      );
      this.router.navigate([this.redirect]);
    } catch (err: any) {
      if (err.status === 400) {
        this.error.set(err.error);
        toast.error('Error al crear el registro');
      } else {
        toast.error('Error inesperado al crear el registro');
      }
    } finally {
      this.loadingSignal.set(false);
    }
  }

  public async editar(): Promise<void> {
    const currentModel = this.model();
    if (!currentModel) return;

    try {
      this.loadingSignal.set(true);
      this.error.set(null);

      const result = await firstValueFrom(this.service.editar(currentModel));
      toast.success(
        `Registro: ${this.nombreModel} ${result.nombre} editado con éxito`,
      );
      this.router.navigate([this.redirect]);
    } catch (err: any) {
      if (err.status === 400) {
        this.error.set(err.error);
        toast.error('Error al editar el registro');
      } else {
        toast.error('Error inesperado al editar el registro');
      }
    } finally {
      this.loadingSignal.set(false);
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Alumno } from '@domain/models/alumno';
import { AlumnoService } from '@infrastructure/services/alumno-service';
import { CommonForm } from '@shared/directives/common-form';
import { toast } from 'ngx-sonner';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-alumno',
  imports: [MatIconModule, RouterLink, FormsModule],
  templateUrl: './form-alumno.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAlumno extends CommonForm<Alumno, AlumnoService> {
  fotoSeleccionada = signal<File | null>(null);
  protected override service = inject(AlumnoService);
  protected override router = inject(Router);
  protected override route = inject(ActivatedRoute);

  constructor() {
    super();
    this.titulo.set('Crear Alumno');
    this.model.set(new Alumno());
    this.redirect = '/alumnos';
    this.nombreModel = Alumno.name;
  }

  public seleccionarFoto(event: any): void {
    const file = event.target.files[0];

    if (file && file.type.indexOf('image') < 0) {
      toast.error('El archivo debe ser de algun formato tipo imagen');
      this.fotoSeleccionada.set(null);
      return;
    }

    this.fotoSeleccionada.set(file);
    console.info(this.fotoSeleccionada());
  }

  public override async crear(): Promise<void> {
    const currentModel = this.model();
    const foto = this.fotoSeleccionada();

    if (!currentModel) return;

    if (!foto) {
      await super.crear();
    } else {
      try {
        this.loadingSignal.set(true);
        this.error.set(null);

        const alumno = await firstValueFrom(
          this.service.crearConFoto(currentModel, foto),
        );

        console.log(alumno);
        toast.success(
          `Nuevo: ${this.nombreModel} ${alumno.nombre} creado con éxito`,
        );
        this.router.navigate([this.redirect]);
      } catch (err: any) {
        if (err.status === 400) {
          this.error.set(err.error);
          console.log(this.error());
        } else {
          toast.error('Error al crear el alumno');
        }
      } finally {
        this.loadingSignal.set(false);
      }
    }
  }

  public override async editar(): Promise<void> {
    const currentModel = this.model();
    const foto = this.fotoSeleccionada();

    if (!currentModel) return;

    if (!foto) {
      await super.editar();
    } else {
      try {
        this.loadingSignal.set(true);
        this.error.set(null);

        const alumno = await firstValueFrom(
          this.service.editarConFoto(currentModel, foto),
        );

        console.log(alumno);
        toast.success(
          `Modificado: ${this.nombreModel} ${alumno.nombre} actualizado con éxito`,
        );
        this.router.navigate([this.redirect]);
      } catch (err: any) {
        if (err.status === 400) {
          this.error.set(err.error);
          console.log(this.error());
        } else {
          toast.error('Error al actualizar el alumno');
        }
      } finally {
        this.loadingSignal.set(false);
      }
    }
  }
}

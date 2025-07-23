/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Asignatura } from '@domain/models/asignatura';
import { Examen } from '@domain/models/examen';
import { Pregunta } from '@domain/models/pregunta';
import { ExamenService } from '@infrastructure/services/examen-service';
import { CommonForm } from '@shared/directives/common-form';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-form-examen',
  imports: [MatIconModule, RouterLink, FormsModule],
  templateUrl: './form-examen.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormExamen
  extends CommonForm<Examen, ExamenService>
  implements OnInit
{
  private cdr = inject(ChangeDetectorRef);
  protected override service = inject(ExamenService);
  protected override router = inject(Router);
  protected override route = inject(ActivatedRoute);

  asignaturasPadre: Asignatura[] = [];
  asignaturasHija: Asignatura[] = [];
  errorPreguntas: string | undefined;

  constructor() {
    super();
    this.titulo.set('Crear Examen');
    this.model.set(new Examen());
    this.redirect = '/examenes';
    this.nombreModel = Examen.name;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id')!;
      if (id) {
        this.service.ver(id).subscribe({
          next: (m) => {
            this.model.set(m);
            this.titulo.set('Editar ' + this.nombreModel);
            this.cargarHijos();
          },
          error: (err) => {
            console.error('Error fetching exam:', err);
            toast.error('Error al cargar el examen');
          },
        });
      }
    });
    this.service.findAllAsignatura().subscribe({
      next: (asignaturas) => {
        this.asignaturasPadre = asignaturas.filter((a) => !a.padre);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching asignaturas:', err);
        toast.error('Error al cargar las asignaturas');
      },
    });
  }

  public override async crear(): Promise<void> {
    if (this.model()!.preguntas.length === 0) {
      toast.error('Examen debe tener preguntas');
      return;
    }
    this.errorPreguntas = undefined;
    this.eliminarPreguntasVacias();
    super.crear();
  }

  public override async editar(): Promise<void> {
    if (this.model()!.preguntas.length === 0) {
      toast.error('Examen debe tener preguntas');
      return;
    }
    this.errorPreguntas = undefined;
    this.eliminarPreguntasVacias();
    super.editar();
  }

  cargarHijos(): void {
    this.asignaturasHija = this.model()!.asignaturaPadre
      ? this.model()!.asignaturaPadre.hijos
      : [];
  }

  compararAsignatura(a1: Asignatura, a2: Asignatura): boolean {
    if (a1 === undefined && a2 === undefined) {
      return true;
    }

    return a1 === null || a2 === null || a1 === undefined || a2 === undefined
      ? false
      : a1.id === a2.id;
  }

  agregarPregunta(): void {
    this.model()!.preguntas.push(new Pregunta());
  }

  asignarTexto(pregunta: Pregunta, event: any): void {
    pregunta.texto = event.target.value as string;
    console.log(this.model);
  }

  eliminarPregunta(pregunta: Pregunta): void {
    this.model()!.preguntas = this.model()!.preguntas.filter(
      (p) => p !== pregunta,
    );
  }

  eliminarPreguntasVacias(): void {
    this.model()!.preguntas = this.model()!.preguntas.filter(
      (p) => p.texto && p.texto.trim().length > 0,
    );
  }
}

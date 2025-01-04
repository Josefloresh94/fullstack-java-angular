import { Component, OnInit } from '@angular/core';
import { Examen } from '../../../models/examen';
import { ExamenService } from '../../../services/examen.service';
import { CommonFormComponent } from '../../common-form.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Asignatura } from '../../../models/asignatura';
import { Pregunta } from '../../../models/pregunta';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examenes-form',
  imports: [RouterModule, FormsModule, MatIconModule],
  templateUrl: './examenes-form.component.html'
})
export class ExamenesFormComponent extends CommonFormComponent<Examen, ExamenService> implements OnInit {

  asignaturasPadre: Asignatura[] = [];
  asignaturasHija: Asignatura[] = [];
  errorPreguntas: string | undefined;

  constructor(service: ExamenService,
    router: Router,
    route: ActivatedRoute) {
      super(service, router, route);
      this.titulo = 'Crear Examen';
      this.model = new Examen();
      this.nombreModel = Examen.name;
      this.redirect = '/examenes';
  }

  override ngOnInit() {
    super.ngOnInit();
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id')!;
      if(id){
        this.service.ver(id).subscribe({
          next: (m) => {
            this.model = m;
            this.titulo = 'Editar ' + this.nombreModel;
            this.cargarHijos();
          },
          error: (err) => {
            console.error('Error fetching exam:', err);
            Swal.fire('Error', `Error al cargar el examen`, 'error');
          }
        });
      }
    });
    this.service.findAllAsignatura().subscribe({
      next: (asignaturas) => {
        this.asignaturasPadre = asignaturas.filter(a => !a.padre);
      },
      error: (err) => {
        console.error('Error fetching asignaturas:', err);
        Swal.fire('Error', `Error al cargar las asignaturas`, 'error');
      }
    });
  }

  public override crear(): void {
    if(this.model.preguntas.length === 0){
      Swal.fire('Error', 'Examen debe tener preguntas', 'error');
      return;
    }
    this.errorPreguntas = undefined;
    this.eliminarPreguntasVacias();
    super.crear();
  }

  public override editar(): void {
    if(this.model.preguntas.length === 0){
      Swal.fire('Error', 'Examen debe tener preguntas', 'error');
      return;
    }
    this.errorPreguntas = undefined;
    this.eliminarPreguntasVacias();
    super.editar();
  }

  cargarHijos(): void {
    this.asignaturasHija = this.model.asignaturaPadre ? this.model.asignaturaPadre.hijos: [];
  }

  compararAsignatura(a1: Asignatura, a2: Asignatura): boolean{
    if(a1===undefined && a2===undefined){
      return true;
    }

    return (a1 === null || a2 === null || a1 === undefined || a2 === undefined) ? false : a1.id === a2.id;
  }

  agregarPregunta(): void {
    this.model.preguntas.push(new Pregunta());
  }

  asignarTexto(pregunta: Pregunta, event: any):void {
    pregunta.texto = event.target.value as string;
    console.log(this.model);
  }

  eliminarPregunta(pregunta: Pregunta): void {
    this.model.preguntas = this.model.preguntas.filter(p => p !== pregunta);
  }

  eliminarPreguntasVacias(): void{
    this.model.preguntas = this.model.preguntas.filter(p => p.texto && p.texto.trim().length > 0);
  }
}

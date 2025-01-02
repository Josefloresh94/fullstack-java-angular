import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../../models/alumno';
import { AlumnoService } from '../../../services/alumno.service';
import { CommonFormComponent } from '../../common-form.component';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-alumnos-form',
  imports: [RouterModule, FormsModule, MatIconModule],
  templateUrl: './alumnos-form.component.html'
})
export class AlumnosFormComponent extends CommonFormComponent<Alumno, AlumnoService> implements OnInit {

  fotoSeleccionada: File | null = null;

  constructor(service: AlumnoService,
    router: Router,
    route: ActivatedRoute) {
    super(service, router, route);
    this.titulo = 'Crear Alumnos';
    this.model = new Alumno();
    this.redirect = '/alumnos';
    this.nombreModel = Alumno.name;
  }

  public seleccionarFoto(event: any): void {
    this.fotoSeleccionada = event.target.files[0];
    console.info(this.fotoSeleccionada);

    if(this.fotoSeleccionada && this.fotoSeleccionada.type.indexOf('image') < 0){
      Swal.fire(
        'Error al seleccionar la foto:',
        'El archivo debe ser del tipo imagen',
        'error');
      }
      this.fotoSeleccionada = null;
  }

  public override crear(): void {
    if(!this.fotoSeleccionada){
      super.crear();
    } else {
      this.service.crearConFoto(this.model, this.fotoSeleccionada)
      .subscribe({
        next: (alumno) => {
          console.log(alumno);
          Swal.fire('Nuevo:', `${this.nombreModel} ${alumno.nombre} creado con éxito`, 'success');
          this.router.navigate([this.redirect]);
        },
        error: (err) => {
          if(err.status === 400){
            this.error = err.error;
            console.log(this.error);
          } else {
            Swal.fire('Error', 'Error al crear el alumno', 'error');
          }
        }
      });
    }
  }

  public override editar(): void {
    if(!this.fotoSeleccionada){
      super.editar();
    } else {
      this.service.editarConFoto(this.model, this.fotoSeleccionada)
      .subscribe({
        next: (alumno) => {
          console.log(alumno);
          Swal.fire('Modificado:', `${this.nombreModel} ${alumno.nombre} actualizado con éxito`, 'success');
          this.router.navigate([this.redirect]);
        },
        error: (err) => {
          if(err.status === 400){
            this.error = err.error;
            console.log(this.error);
          } else {
            Swal.fire('Error', 'Error al actualizar el alumno', 'error');
          }
        }
      });
    }
  }
}

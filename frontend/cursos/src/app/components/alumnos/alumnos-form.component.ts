import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Alumno } from '../../models/alumno';
import { FormsModule, NgForm } from '@angular/forms'
import { AlumnoService } from '../../services/alumno.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-alumnos-form',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './alumnos-form.component.html'
})
export class AlumnosFormComponent implements OnInit {
  title: String = 'Crear Alumno';

  alumno: Alumno;

  error: any;

  constructor(
    private service: AlumnoService, 
    private router: Router,
    private route: ActivatedRoute
  ){
    this.alumno = new Alumno();
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id')!;
      if (id) {
        this.service.ver(id).subscribe(alumno => this.alumno = alumno)
      }
    })
  }

  public crear(): void {
    this.service.crear(this.alumno).subscribe(alumno => {
      console.log(alumno);
      Swal.fire('Nuevo:', `Alumno ${alumno.nombre} creado con éxito`, 'success');
      this.router.navigate(['/alumnos']);
    }, err => {
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error);
        
      }
    });
  }

  public editar(): void {
    this.service.editar(this.alumno).subscribe(alumno => {
      console.log(alumno);
      Swal.fire('Modificado:', `Alumno ${alumno.nombre} actualizado con éxito`, 'success');
      this.router.navigate(['/alumnos']);
    }, err => {
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error);
        
      }
    });
  }


}

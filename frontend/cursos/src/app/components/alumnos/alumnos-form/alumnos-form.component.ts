import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Alumno } from '../../../models/alumno';
import { AlumnoService } from '../../../services/alumno.service';
import {MatCardModule} from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2'
const MATERIAL_MODULES = [MatLabel, MatFormField, MatInput, MatCardModule, MatButtonModule, MatIconModule]

@Component({
    selector: 'app-alumnos-form',
    imports: [RouterModule, ReactiveFormsModule, CommonModule, MATERIAL_MODULES],
    templateUrl: './alumnos-form.component.html',
    styleUrl: './alumnos-form.component.css',
})
export class AlumnosFormComponent implements OnInit {
  title: String = 'Crear Alumno';

  alumnoForm!: FormGroup;
  alumno: Alumno;

  error: any;

  private readonly _fb = inject(FormBuilder);
  // private readonly _matDialog = '';
	private readonly _service = inject(AlumnoService);

  constructor(
    private service: AlumnoService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.alumno = new Alumno();
  }
  ngOnInit() {
    this._buildForm();
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

  private _buildForm(): void {
    this.alumnoForm = this._fb.nonNullable.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required]
    });
  }
}

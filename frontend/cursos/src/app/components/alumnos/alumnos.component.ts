import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'alumnos',
  standalone: true,
  imports: [],
  templateUrl: './alumnos.component.html'
})
export class AlumnosComponent implements OnInit{

  titulo: string = 'Listado de Alumnos';
  constructor(){}
  ngOnInit() {
    
  }
}

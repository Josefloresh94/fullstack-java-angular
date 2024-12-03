import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { Alumno, ColumnKeys } from "../../models/alumno";
import { AlumnosGridComponent } from "./alumnos-grid/alumnos-grid.component";
import { AlumnoService } from "../../services/alumno.service";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from "rxjs";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
const MATERIAL_MODULES = [MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule];

@Component({
    selector: 'alumnos',
    imports: [AlumnosGridComponent, MATERIAL_MODULES, RouterModule],
    templateUrl: './alumnos.component.html',
    styleUrl: './alumnos.component.css'
})
export class AlumnosComponent implements OnInit{
  alumnos = signal<Alumno[]>([]);

  displayedColumns: ColumnKeys<Alumno> = ['id', 'nombre','apellido', 'email', 'action'];
  sortables: ColumnKeys<Alumno> = ['id', 'nombre','apellido', 'email'];

  private readonly _contactSvc = inject(AlumnoService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this._contactSvc.listar()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((alumnos:Alumno[]) => this.alumnos.set(alumnos))
      )
    .subscribe()
  }
}

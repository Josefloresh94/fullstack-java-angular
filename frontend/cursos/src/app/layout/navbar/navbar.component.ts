import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
const MATERIAL_MODULES = [MatToolbarModule, MatIconModule, MatButtonModule];

@Component({
    selector: 'navbar',
    imports: [RouterModule, MATERIAL_MODULES],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {

}

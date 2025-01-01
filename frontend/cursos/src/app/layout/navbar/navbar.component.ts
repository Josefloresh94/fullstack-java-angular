import { NgClass } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
    selector: 'navbar',
    imports: [RouterModule, NgClass, MatIconModule],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  isDropdownOpen = false;
  isMenuOpen = false;
  isActive = false;
  activeRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects;
      }
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.relative');
    if (!clickedInside) {
      this.isDropdownOpen = false;
      this.isMenuOpen = false;
    }
  }

  isActiveRoute(route: string): boolean {
    return this.activeRoute === route;
  }
}

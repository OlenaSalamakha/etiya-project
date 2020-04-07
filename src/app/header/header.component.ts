import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  template: `<header>
    <nav
      class="navbar navbar-expand-lg d-flex justify-content-center align-items-center"
    >
      <a [routerLink]="'/main-page'" class="navbar-brand" href="#">
        Etiya Team
      </a>
    </nav>
  </header>`,
  styles: [
    `
      header {
        background-color: rgb(255, 188, 2);
      }

      .navbar-brand {
        font-weight: bold;
        font-size: 20px;
        color: white;
      }
    `,
  ],
})
export class HeaderComponent { }

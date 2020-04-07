import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <div
        class="bg-dark text-light d-flex flex-column py-2 px-2 align-items-start"
      >
        <span class="py-2 px-2">Ukraine, Lviv</span>
        <span class="py-2 px-2">Shevchenka 80 Street</span>
        <span class="py-2 px-2">2020 © ETIYA ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  `,
  styles: [
    `
      footer {
        height: auto;
        width: 100%;
        font-size: 16px;
      }
    `,
  ],
})
export class FooterComponent { }

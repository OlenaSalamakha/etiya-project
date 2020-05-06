import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `<div id="sidebar-wrapper">
  <div class="list-group list-group-flush border">
    <div>
      <a routerLink = '/main-page' routerLinkActive="active" class="list-group-item list-group-item-action">Main page</a>
    </div>
    <div>
      <a routerLink = '/user-info' routerLinkActive="active" class="list-group-item list-group-item-action">User info</a>
    </div>
    <div>
      <a routerLink = '/registration' routerLinkActive="active" class="list-group-item list-group-item-action">Create user</a>
    </div>
  </div>
</div>`,
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}

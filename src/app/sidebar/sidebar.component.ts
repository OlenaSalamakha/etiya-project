import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  template: `<div id="sidebar-wrapper">
  <div class="list-group list-group-flush border">
    <div>
      <a [routerLink] = "'/main-page'" routerLinkActive="active" class="list-group-item list-group-item-action">Main page</a>
    </div>
    <div *ngIf="isAuthenticated">
      <a [routerLink] = "'/user-info'" routerLinkActive="active" class="list-group-item list-group-item-action">User info</a>
    </div>
    <div *ngIf="isAuthenticated">
      <a [routerLink] = "'/create-user'" routerLinkActive="active" class="list-group-item list-group-item-action">Create user</a>
    </div>
  </div>
</div>`,
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}

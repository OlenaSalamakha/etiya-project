import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  template: `<header>
  <nav class="navbar navbar-expand-lg">
     <a [routerLink] = "'/main-page'" class="navbar-brand" href="#"><h3 class="text-white py-3 px-5 m-0">
        Etiya Team
     </h3></a>
     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
     </button>
     <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
       <div *ngIf="isAuthenticated" class="navbar-nav">
         <button class="btn btn-outline-light">
            Log out
         </button>
       </div>
     </div>
   </nav>
</header>`,
  styles: [`header {
    background-color: rgb(255, 188, 2);
  }`]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}

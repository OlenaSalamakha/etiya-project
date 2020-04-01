import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService, AuthResponseData } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  signInForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }
  onSubmit() {
    const email: string = this.signInForm.get('email').value;
    const password: string = this.signInForm.get('password').value;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);

    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/create-user']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    this.signInForm.reset();

  }

}


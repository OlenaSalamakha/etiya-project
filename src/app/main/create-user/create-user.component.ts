import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { compareValidator } from 'src/app/shared/directives/compare-validator.directive';
import { CreatedUser } from 'src/app/shared/models/create-user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  @Output() sendUserProfileEvent = new EventEmitter<CreatedUser>();
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(/^[0-9 ]+$/)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirm_password: [
        null,
        [Validators.required, compareValidator('password')]
      ]
    });
  }

  sendUserProfile() {
    this.sendUserProfileEvent.emit(this.signupForm.value);
  }

  checkForm(fieldname: string) {
    return (
      !this.signupForm.get(fieldname).valid &&
      this.signupForm.get(fieldname).touched
    );
  }

  resetAddress() {
    this.signupForm.reset();
  }
}

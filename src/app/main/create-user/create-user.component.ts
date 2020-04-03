import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { compareValidator } from "src/app/shared/directives/compare-validator.directive";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"]
})
export class CreateUserComponent implements OnInit {
  signupForm: FormGroup;
  @Output() sendUserProfileEvent = new EventEmitter<FormGroup>();

  sendUserProfile() {
    this.sendUserProfileEvent.emit(this.signupForm);
  }

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern(/^[0-9 ]+$/)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirm_password: [
        "",
        [Validators.required, compareValidator("password")]
      ]
    });
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

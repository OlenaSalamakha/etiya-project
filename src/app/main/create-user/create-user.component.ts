import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { compareValidator } from 'src/app/shared/directives/compare-validator.directive';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private router: Router, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9 ]+$/)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confirm-password': new FormControl(null, [Validators.required, compareValidator('password')])
    });

  }

  onSubmit() {
    this.onPostData();
    this.router.navigateByUrl('/address');
  }

  onPostData() {
    this.dataStorageService.storeRegisterData(this.signupForm.value)
      .subscribe(response => console.log(`post: ${response}`));
  }
}


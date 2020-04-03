import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { DataStorageService } from "src/app/shared/services/data-storage.service";
import { CreatedUser } from "src/app/shared/modules/create-user.model";
import { AddressData } from "src/app/shared/modules/userAddresData.model";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  recievedUserProfile: CreatedUser;
  recievedUserAddress: AddressData;

  recieveFromCreateUser($event) {
    this.recievedUserProfile = $event;
    this.generalForm.patchValue([
      {
        firstname: this.recievedUserProfile.firstname,
        lastname: this.recievedUserProfile.lastname,
        username: this.recievedUserProfile.username,
        phone: this.recievedUserProfile.phone,
        email: this.recievedUserProfile.email,
        password: this.recievedUserProfile.password
      }
    ]);
  }

  recieveFromAddress($event) {
    this.recievedUserAddress = $event;
    console.log(this.recievedUserAddress);
  }

  generalForm: FormGroup;

  constructor(
    private dataStorageService: DataStorageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.generalForm = this.formBuilder.group({
      firstname: [null],
      lastname: [null],
      username: [null],
      email: [null],
      phone: [null],
      password: [null],
      typeOfAddress: [null],
      city: [null],
      country: [null],
      street: [null],
      postalCode: [null],
      additionalAddress: [null]
    });
  }

  onPostData() {
    this.dataStorageService
      .storeRegisterData(this.generalForm.value)
      .subscribe(response => console.log(`post: ${response}`));
  }

  onSave() {
    this.onPostData();
  }
}

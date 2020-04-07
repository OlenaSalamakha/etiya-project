import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { CreatedUser } from 'src/app/shared/models/create-user.model';
import { AddressData } from 'src/app/shared/models/userAddresData.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [`p {
    padding: 0;
    margin: 0;
    font-family: inherit;
    font-size: 18px;
    display: inline;
  }
  
  .data-box {
    width: 100%;
  }
  
  span {
    color: grey;
    font-style: italic;
  }`],
})
export class RegistrationComponent implements OnInit {
  recievedUserProfile: CreatedUser;
  recievedUserAddress: AddressData;
  generalForm: FormGroup;

  constructor(
    private dataStorageService: DataStorageService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.generalForm = this.formBuilder.group({
      firstname: null,
      lastname: null,
      username: null,
      phone: null,
      email: null,
      password: null,
      typeOfAddress: null,
      city: null,
      country: null,
      street: null,
      postalCode: null,
      additionalAddress: null,
    });
  }

  recieveFromCreateUser($event) {
    this.recievedUserProfile = $event;
    this.generalForm.patchValue({
      firstname: this.recievedUserProfile.firstname,
      lastname: this.recievedUserProfile.lastname,
      username: this.recievedUserProfile.username,
      phone: this.recievedUserProfile.phone,
      email: this.recievedUserProfile.email,
      password: this.recievedUserProfile.password,
    });
  }

  recieveFromAddress($event) {
    this.recievedUserAddress = $event;
    this.generalForm.patchValue({
      typeOfAddress: this.recievedUserAddress.typeOfAddress,
      city: this.recievedUserAddress.city,
      country: this.recievedUserAddress.country,
      street: this.recievedUserAddress.street,
      postalCode: this.recievedUserAddress.postalCode,
      additionalAddress: this.recievedUserAddress.additionalAddress,
    });
  }

  getUserValue(fieldname: string) {
    return this.generalForm.get(fieldname).value;
  }

  onPostData() {
    this.dataStorageService
      .storeRegisterData(this.generalForm.value)
      .subscribe((response) => console.log(`post: ${response}`));
  }

  onSave() {
    this.onPostData();
  }
}

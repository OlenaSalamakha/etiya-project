import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Country } from 'src/app/shared/models/country.model';
import { DataService } from 'src/app/shared/services/data.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Address } from 'src/app/shared/models/typeOfAddress.model';
import { AddressData } from 'src/app/shared/models/userAddresData.model';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styles: [
    `
      .address-data {
        padding: 20px 20px 45px 20px;
        border: 1px solid gainsboro;
        border-radius: 10px;
        margin-bottom: 25px;
      }
    `,
  ],
})
export class AddressComponent implements OnInit {
  @Output() sendUserAddressEvent = new EventEmitter<AddressData>();
  addressForm: FormGroup;
  countries: Country[];
  addresses: Address[] = [
    { value: 'Home', viewValue: 'Home Address' },
    { value: 'Billing', viewValue: 'Billing Address' },
    { value: 'Shipment', viewValue: 'Shipment Address' },
  ];

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      typeOfAddress: [null, Validators.required],
      city: null,
      country: [null, Validators.required],
      street: null,
      postalCode: [null, Validators.pattern(/^[0-9 ]+$/)],
      additionalAddress: new FormArray([]),
    });
    this.dataService.getCountry().subscribe((data) => (this.countries = data));
  }

  sendUserAddress() {
    this.sendUserAddressEvent.emit(this.addressForm.value);
  }

  get addressArray() {
    return this.addressForm.get('additionalAddress') as FormArray;
  }

  onAddAddress() {
    this.addressArray.push(
      this.formBuilder.group({
        typeOfAddress: [null, Validators.required],
        city: null,
        country: [null, Validators.required],
        street: null,
        postalCode: [null, Validators.pattern(/^[0-9 ]+$/)],
      })
    );
  }

  removeAddress(index: number) {
    this.addressArray.removeAt(index);
  }

  resetAddress() {
    this.addressForm.reset();
  }
}

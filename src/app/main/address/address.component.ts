import { Component, OnInit } from "@angular/core";
import { Country } from "src/app/shared/modules/country.model";
import { DataService } from "src/app/shared/services/data.service";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Router } from "@angular/router";
import { Address } from "src/app/shared/modules/address.model";
@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.css"]
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;

  addresses: Address[] = [
    { value: "home-0", viewValue: "Home Address" },
    { value: "billing-1", viewValue: "Billing Address" },
    { value: "shipment-2", viewValue: "Shipment Address" }
  ];

  countries$: Country[];
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      typeOfAddress: ["", Validators.required],
      city: [""],
      country: ["", Validators.required],
      street: [""],
      postalCode: ["", Validators.pattern(/^[0-9 ]+$/)],
      additionalAddress: new FormArray([])
    });
    this.dataService.getCountry().subscribe(data => (this.countries$ = data));
  }

  get addressArray() {
    return this.addressForm.get("additionalAddress") as FormArray;
  }

  onAddAddress() {
    this.addressArray.push(
      this.formBuilder.group({
        typeOfAddress: ["", Validators.required],
        city: [""],
        country: ["", Validators.required],
        street: [""],
        postalCode: ["", Validators.pattern(/^[0-9 ]+$/)]
      })
    );
  }

  removeAddress(i: number) {
    this.addressArray.removeAt(i);
  }

  resetAddress() {
    this.addressForm.reset();
  }

  onPrevious() {
    this.router.navigateByUrl("/create-user");
  }
}

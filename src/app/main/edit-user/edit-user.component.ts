import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { DataStorageService } from "src/app/shared/services/data-storage.service";
import { UserData } from "src/app/shared/models/user-data.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styles: [
    `
      button {
        border: 0;
        outline: none;
        outline-style: none;
      }
    `,
  ],
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataStorage: DataStorageService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditUserComponent>
  ) {}

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(/^[0-9 ]+$/)]],
      password: null,
      typeOfAddress: null,
      city: null,
      country: null,
      street: null,
      postalCode: null,
      additionalAddress: null,
    });
    this.getUser(this.data.message);
  }

  getUser(id: string) {
    this.dataStorage
      .getUserById(id)
      .subscribe((user: UserData) => this.editUser(user));
  }

  editUser(user: UserData) {
    this.editForm.patchValue({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      phone: user.phone,
      email: user.email,
      password: user.password,
      typeOfAddress: user.typeOfAddress,
      city: user.city,
      country: user.country,
      street: user.street,
      postalCode: user.postalCode,
      additionalAddress: user.additionalAddress,
    });
  }

  updateUser() {
    this.dataStorage
      .updateUser(this.editForm.value, this.data.message)
      .subscribe((response) => console.log(response));
  }

  checkForm(fieldname: string) {
    return (
      !this.editForm.get(fieldname).valid &&
      this.editForm.get(fieldname).touched
    );
  }

  resetEditForm() {
    this.editForm.reset();
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}

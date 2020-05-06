import { Component, OnInit } from "@angular/core";
import { UserData } from "src/app/shared/models/user-data.model";
import { map } from "rxjs/operators";
import { DataStorageService } from "src/app/shared/services/data-storage.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DialogService } from "src/app/shared/services/dialog.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styles: [
    `
      button {
        outline: 0;
      }
    `,
  ],
})
export class UserInfoComponent implements OnInit {
  loadedUsers: UserData[] = [];
  isFetching = false;
  searchform: FormGroup;

  constructor(
    private dataStorageService: DataStorageService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.searchform = this.fb.group({
      firstname: null,
      lastname: null,
      uname: null,
      phone: null,
      email: null,
    });
    this.onFetchData();
  }

  getUserValue(fieldname: string) {
    return this.searchform.get(fieldname).value;
  }

  onFound() {
    this.searchUser("firstname", "firstname");
    this.searchUser("lastname", "lastname");
    this.searchUser("uname", "username");
    this.searchUser("email", "email");
    this.searchUser("phone", "phone");
  }

  onClear() {
    this.searchform.reset();
    this.onFetchData();
  }

  onFetchData() {
    this.isFetching = true;
    this.dataStorageService.fetchRegisterData().subscribe((userData) => {
      this.isFetching = false;
      this.loadedUsers = userData;
    });
  }

  searchUser(fieldname: string, key: string) {
    if (this.getUserValue(fieldname)) {
      this.loadedUsers = this.loadedUsers.filter((user) => {
        if (user[key].includes(this.searchform.get(fieldname).value)) {
          return user[key];
        }
      });
    }
  }

  deleteUserDialog(userToDelete: UserData) {
    this.dialogService
      .openConfirmDialog("Do you really want to delete user?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.dataStorageService.deleteUser(userToDelete.id).subscribe(() => {
            this.loadedUsers = this.loadedUsers.filter(
              (user) => user !== userToDelete
            );
          });
        }
      });
  }

  updateUser(user: UserData) {
    this.openUpdateDialog(user.id);
  }

  openUpdateDialog(userId: string) {
    this.dialogService
      .openEditForm(userId)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          alert("User will be updated!");
          this.onFetchData();
        }
      });
  }
}

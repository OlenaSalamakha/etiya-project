import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/shared/models/user-data.model';
import { map } from 'rxjs/operators';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html'
})
export class UserInfoComponent implements OnInit {
  loadedUsers: UserData[] = [];
  isFetching = false;
  searchform: FormGroup;

  constructor(private dataStorageService: DataStorageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.searchform = this.fb.group({
      firstname: null,
      lastname: null,
      uname: null,
      phone: null,
      email: null
    });
    this.onFetchData();
  }

  getUserValue(fieldname: string) {
    return this.searchform.get(fieldname).value;
  }

  onFound() {
    this.loadedUsers.forEach(user => console.log(user.id));
    this.searchUser('firstname', 'firstname');
    this.searchUser('lastname', 'lastname');
    this.searchUser('uname', 'username');
    this.searchUser('email', 'email');
    this.searchUser('phone', 'phone');
  }

  onClear() {
    this.searchform.reset();
    this.onFetchData();
  }

  onFetchData() {
    this.isFetching = true;
    this.dataStorageService
      .fetchRegisterData()
      .pipe(
        map(response => {
          const postArray: UserData[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              postArray.push({ ...response[key], id: key });
            }
          }
          return postArray;
        })
      )
      .subscribe(userData => {
        this.isFetching = false;
        this.loadedUsers = userData;
      });
  }

  searchUser(fieldname: string, key: string) {
    if (this.getUserValue(fieldname)) {
      this.loadedUsers = this.loadedUsers.filter(user => {
        if (user[key].includes(this.searchform.get(fieldname).value)) {
          return user[key];
        }
      });
    }
  }
}

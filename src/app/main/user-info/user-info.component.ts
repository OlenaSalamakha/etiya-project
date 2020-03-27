import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { map } from 'rxjs/operators'

export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  username: string;
  phone: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  loadedUsers: User[] = [];
  isFetching = false;

  onFetchData() {
    this.isFetching = true;
    this.dataStorageService.fetchRegisterData()
      .pipe(
        map(response => {
          const postArray: User[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              postArray.push({ ...response[key], id: key });
            }
          }
          return postArray;
        }))
      .subscribe(userData => {
        this.isFetching = false;
        this.loadedUsers = userData;
      });
  }

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.onFetchData();
  }

}

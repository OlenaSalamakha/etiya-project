import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/shared/models/user-data.model';
import { map } from 'rxjs/operators';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html'
})
export class UserInfoComponent implements OnInit {
  loadedUsers: UserData[] = [];
  isFetching = false;
  loadedAddress: string[];
  searchText;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.onFetchData();
  }

  onFind() {
    for (let user of this.loadedUsers) {
      return this.loadedAddress = user.additionalAddress;
    }
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
}

import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "src/app/shared/services/data-storage.service";
import { map } from "rxjs/operators";
import { CreatedUser } from "src/app/shared/modules/create-user.model";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {
  loadedUsers: CreatedUser[] = [];
  isFetching = false;

  onFetchData() {
    this.isFetching = true;
    this.dataStorageService
      .fetchRegisterData()
      .pipe(
        map(response => {
          const postArray: CreatedUser[] = [];
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

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit() {
    this.onFetchData();
  }
}

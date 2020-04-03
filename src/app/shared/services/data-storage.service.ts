import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserData } from "../modules/user-data.model";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  storeRegisterData(user: UserData) {
    return this.http.post(
      "https://etiya-project.firebaseio.com/regist-user.json",
      user
    );
  }

  fetchRegisterData() {
    return this.http.get<{ [key: string]: UserData }>(
      "https://etiya-project.firebaseio.com/regist-user.json"
    );
  }
}

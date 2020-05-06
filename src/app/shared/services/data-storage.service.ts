import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserData } from "../models/user-data.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  getUserById(id: string) {
    return this.http.get<UserData>(
      "https://etiya-project.firebaseio.com/regist-user" + "/" + id + ".json"
    );
  }

  storeRegisterData(user: UserData) {
    return this.http.post(
      "https://etiya-project.firebaseio.com/regist-user.json",
      user
    );
  }

  fetchRegisterData() {
    return this.http
      .get<{ [key: string]: UserData }>(
        "https://etiya-project.firebaseio.com/regist-user.json"
      )
      .pipe(
        map((data) => {
          const postArray: UserData[] = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              postArray.push({ ...data[key], id: key });
            }
          }
          return postArray;
        })
      );
  }

  deleteUser(id: string) {
    return this.http.delete(
      "https://etiya-project.firebaseio.com/regist-user" + "/" + id + ".json"
    );
  }

  updateUser(user: UserData, id: string): Observable<UserData> {
    return this.http.put<UserData>(
      "https://etiya-project.firebaseio.com/regist-user" + "/" + id + ".json",
      user
    );
  }
}

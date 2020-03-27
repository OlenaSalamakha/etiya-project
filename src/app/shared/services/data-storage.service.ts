import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreatedUser } from '../modules/create-user.model';

@Injectable({ providedIn: 'root' })

export class DataStorageService {
  constructor(private http: HttpClient) { }

  storeRegisterData(user: CreatedUser) {
    return this.http.post('https://etiya-project.firebaseio.com/regist-user.json', user);
  }

  fetchRegisterData() {
    return this.http.get<{ [key: string]: CreatedUser }>('https://etiya-project.firebaseio.com/regist-user.json');
  }
}
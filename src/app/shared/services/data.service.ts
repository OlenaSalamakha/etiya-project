import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Country } from "../models/country.model";

@Injectable({
  providedIn: "root"
})
export class DataService {
  apiUrl = "https://restcountries.eu/rest/v2/";

  constructor(private http: HttpClient) {}
  getCountry() {
    return this.http.get<Country[]>(this.apiUrl);
  }
}

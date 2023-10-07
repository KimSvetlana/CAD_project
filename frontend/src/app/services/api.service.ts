import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { catchError, throwError } from 'rxjs';

type ConeParams = {
  height: number,
  radius: number,
  numSegments: number
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getData(params: ConeParams) {
    console.log('get data with coneParams', params)
    const port = 4000;
    return this.http.get(`http://localhost:${4000}/api/data`, {headers: new HttpHeaders("Content-Type: application/json"), params: params})
  }
}

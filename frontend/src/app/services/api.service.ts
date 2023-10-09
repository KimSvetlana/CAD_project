import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

type ConeParams = {
  height: number;
  radius: number;
  numSegments: number;
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  public getData(params: ConeParams) {
    const port = 4000;
    return this.http
      .get(`http://localhost:${port}/api/data`, {
        headers: new HttpHeaders('Content-Type: application/json'),
        params: params,
      })
      .pipe(
        catchError((error) => {
          this.formatErrors(error);
          return throwError(error);
        })
      );
  }

  private formatErrors(error: Error) {
    this.snackbar.open(`Что-то произошло. Error: ${error.message}`, 'Закрыть', {
      duration: 5000,
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DigimonService {
  baseURL = 'https://digimon-api.vercel.app/api/digimon'

  constructor(private http: HttpClient) { }

  getDigimons(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.baseURL)
  }

  getDigimonsByLevel(level: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.baseURL + '/level/' + encodeURIComponent(level))
  }

  getDigimonByName(name: string | null): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.baseURL + '/name/' + name)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPatients() {
    // API link modified to fetch birthdate between 1960-1965
    return this.httpClient.get(environment.queryURI + '/Patient/?birthdate=ge1960-01-01&birthdate=le1965-12-31',
      { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/fhir+json'
    });
    return headers;
  }

  // Allow user to search by name 
  userSearch(userInput: string) {
    if (!userInput.trim()) {
      return ([]);
    }

    return this.httpClient.get(environment.queryURI + '/Patient/?name=' + userInput)
  }

  // Allow user to search by birthdate
  birthdateSearch(userBirthDate) {
    return this.httpClient.get(environment.queryURI + '/Patient/?birthdate=' + userBirthDate )
  }
}



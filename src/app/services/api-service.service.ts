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
    const yearFilter = '?birthdate=ge1960-01-01&birthdate=le1965-12-31'
    
    return this.httpClient.get(environment.queryURI + '/Patient/' + yearFilter,
      { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/fhir+json'
    });
    return headers;
  }

  // API call to search by name 
  nameSearch() {
    // API link modified to fetch birthdate between 1960-1965
    const userInput = this.value
    
    return this.httpClient.get(environment.queryURI + '/Patient/?name=' + this.value,
      { headers: this.getHeaders() });
  }

  // API call to search by birthdate
  birthdateSearch(userBirthDate) {
    return this.httpClient.get(environment.queryURI + '/Patient/?birthdate=' + userBirthDate )
  }
}



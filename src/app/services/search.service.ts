import { Injectable , Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class Search {
  //not sure why value is passing as empty string from parent...
  // @Input() value;
  @Input() value;

  constructor(
    private httpClient: HttpClient
  ) {}

  searchByName() {
    // API link modified to fetch birthdate between 1960-1965
    const name = this.value
    
    return this.httpClient.get(environment.queryURI + '/Patient/?name=' + name,
      { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/fhir+json'
    });
    return headers;
  }
}

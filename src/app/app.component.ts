import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app/services/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'fhir-app-test';

  headers = ['ID' , 'name', 'gender', 'city', 'birthdate']

  rows = [
    {
      'ID' : '1',
      'name' : 'deb',
      'age' : '28',
      'gender' : 'female',
      'city' : 'toronto',
      'birthdate' : '1992/05/27'
    },
    {
      'ID' : '1',
      'name' : 'deb',
      'age' : '28',
      'gender' : 'female',
      'city' : 'toronto'
    },
    {
      'ID' : '1',
      'name' : 'deb',
      'age' : '28',
      'gender' : 'female',
      'city' : 'toronto'
    },
    {
      'ID' : '1',
      'name' : 'deb',
      'age' : '28',
      'gender' : 'female',
      'city' : 'toronto'
    }
  ]

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getPatients().subscribe(
      data => {
        console.log(data);
      }
    )
  }
}



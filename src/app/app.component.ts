import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app/services/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'fhir-app-test';

  headers = ['ID' , 'last name', 'first name', 'gender', 'birthdate']

  items = []

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getPatients().subscribe(
      (data: any) => {
        console.log(data);
        this.items = data.entry;
        console.log(typeof this.items);

        this.items.forEach(arr => {
          console.log(arr.resource.id);
          return arr;
        })

        // this.items.sort((a,b) => a.resource.birthDate.rendered.localeCompare(b.resource.birthDate.rendered));
        // console.log(this.items.sort);
      }
      )
    }

    // function to sort the array
    sortData() {
      console.log('wtf');
    }

}

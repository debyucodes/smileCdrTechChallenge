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

  startTime! : number
  initTime! : number
  contentInitTime! : number
  viewInitTime! : number

  printTime(time : number) {
    console.log(`Global loading ${ time }`);
    console.log(`Component loading ${ time - this.startTime}`)
    this.globalLoading = time
    this.componentLoading = time - this.startTime
  }

  globalLoading : any = []
  componentLoading: any = []

  constructor(
    private apiService: ApiService
  ) { 
    this.startTime = window.performance.now();
    this.printTime(this.startTime);
  }

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

        // SORTING?
        // this.items.sort((a,b) => a.resource.birthDate.rendered.localeCompare(b.resource.birthDate.rendered));
        // console.log(this.items.sort);
      }
      )

      // Record Initialize Time
      this.initTime = window.performance.now()
      this.printTime(this.initTime)
    }

    // Record Content Rendered Time
    ngAfterContentInit() {
      this.contentInitTime = window.performance.now()
      this.printTime(this.contentInitTime)
    }

}

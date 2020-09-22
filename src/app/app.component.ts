import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app/services/api-service.service';
// import { Search } from '../app/services/search.service';

import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'fhir-app-test';

  headers = ['ID' , 'last name', 'first name', 'gender', 'birthdate']

  items = []

  startTime! : number
  initTime! : number
  contentInitTime! : number

  printTime(time : number) {
    console.log(`Global loading ${ time }`);
    console.log(`Request loading ${ time - this.startTime}`)
    this.globalLoading = time
    this.requestLoading = time - this.startTime
  }

  globalLoading : any = []
  requestLoading: any = []

  value = ''
  pattern: string | RegExp
  date = ''

  constructor(
    private apiService: ApiService,
    private httpClient: HttpClient,
    // private search: Search,
  ) { 
    // RECORDING START OF LOAD
    this.startTime = window.performance.now();
    this.printTime(this.startTime);
  }

  // SEARCH BY NAME
  onEnter(value: string) {
    this.value = value

    this.clearTable();
    this.searchByName().subscribe(
      (data: any) => {
        console.log(data);
        this.items = data.entry;

        this.items.forEach(arr => {
          console.log(arr.resource.id);
          return arr;
        })

        // SORT BY BIRTHDATE (YOUNGEST-OLDEST)
        this.items.sort((a, b) => {
          if (b.resource.birthDate > a.resource.birthDate) {
            return 1
          } else {
            return -1
          }
        })
      })
  }

  // Clear table for better user experience
  clearTable() {
    this.items.length = 0
  }

  // API CALL BASED ON NAME SEARCHED
  searchByName() {
    const name = this.value
    return this.httpClient.get(environment.queryURI + '/Patient/?name=' + name);
  }

  // SEARCH BY DATE
  onEnterDate(date: string) {
    this.date = date
    console.log(this.date);
    console.log('hohoho')
  }

  // API CALL BASED ON NAME SEARCHED
  searchByDate() {
    const inputDate = this.date
    return this.httpClient.get(environment.queryURI + '/Patient/?birthdate=' + inputDate);
  }

  // INIT API CALL
  ngOnInit() {
    this.apiService.getPatients().subscribe(
      (data: any) => {
        console.log(data);
        this.items = data.entry;

        this.items.forEach(arr => {
          console.log(arr.resource.id);
          return arr;
        })

        // SORT BY BIRTHDATE (YOUNGES-OLDEST)
        this.items.sort((a, b) => {
          if (b.resource.birthDate > a.resource.birthDate) {
            return 1
          } else {
            return -1
          }
        })
      })

      // RECORD INIT TIME
      this.initTime = window.performance.now()
      this.printTime(this.initTime)
    }

  // RECORD RENDERED TIME
  ngAfterContentInit() {
    this.contentInitTime = window.performance.now()
    this.printTime(this.contentInitTime)
  }
// END OF CLASS
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Employee } from '../models/employemodel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = 'http://localhost:4536';

  constructor(private htp: HttpClient) { }

  employee(): Observable<any> {
    return this.htp.get(this.url + '/getdetails', { responseType: 'json' });
  }

  addemployeedetails(employ: Employee): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    return this.htp.post(this.url + '/adddetails', JSON.stringify(employ), httpOptions);

  }

  updateemployee(em: Employee): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    return this.htp.post(this.url + '/updateemp', em, httpOptions)
  }

  getdetailsbyid(empid: any): Observable<any> {
    return this.htp.get(this.url + '/getbyid/' + empid, { responseType: 'json' })
  }

  deleteemployee(empid: any): Observable<any> {
    return this.htp.get(this.url + '/deleteemp/' + empid, { responseType: 'json' })
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public currentEmployee:any;
  http: HttpClient;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(http: HttpClient) {
    this.http = http;

  }

  login(data: any) {
    return this.http.post('http://api.refahkh.ir/api/v1/login', data).pipe(map(
      (result)=> result));
  }

  loginAdmin(data: any) {
    return this.http.post('http://api.refahkh.ir/api/v1/admin/login', data).pipe(map(
      (result) => this.currentEmployee = result));
  }
}

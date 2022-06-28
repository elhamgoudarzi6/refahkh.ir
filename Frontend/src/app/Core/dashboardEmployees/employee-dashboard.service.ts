import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {EmployeeDashboardModule} from './employee-dashboard.module';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDashboardService {
  public currentEmployee;

  constructor(private http: HttpClient) {

  }

  login(data: any) {
    return this.http.post<EmployeeDashboardModule>('http://api.refahkh.ir/api/v1/login', data).pipe(map(
      (result) => this.currentEmployee = result));
  }
  update(data: any,id:any) {
    return this.http.put('http://api.refahkh.ir/api/v1/updateEmployee/'+id, data).pipe(map(
      result => result));
  }
  indexLoan() {
    return this.http.get('http://api.refahkh.ir/api/v1/loan').pipe(map(
      result => result));
  }
  uploadFile(image:any) {
    return this.http.post('http://api.refahkh.ir/api/v1/image', image);
  }
  requestLoan(data:any) {
    return this.http.post('http://api.refahkh.ir/api/v1/request',data).pipe(map(
      result => result));
  }
  showRequestLoan(data:any):Observable<any> {
    return this.http.post('http://api.refahkh.ir/api/v1/showRequest',data).pipe(map(
      result => result));
  }
  showResult(data:any):Observable<any> {
    return this.http.post('http://api.refahkh.ir/api/v1/showResult',data).pipe(map(
      result => result));
  }
 countRequestLoan(id:any) {
    return this.http.get('http://api.refahkh.ir/api/v1/countRequest/'+id).pipe(map(
      result => result));
  }
  deleteRequestLoan(data:any):Observable<any> {
    return this.http.post('http://api.refahkh.ir/api/v1/requestloan',data).pipe(map(
      result => result));
  }

  showResultAndDate(data:any):Observable<any> {
    return this.http.post('http://api.refahkh.ir/api/v1/showResultAndDate',data).pipe(map(
      result => result));
  }
}

import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAdminService {
  public currentEmployee;

  constructor(private http: HttpClient) {

  }



  update(data: any, id: any) {
    return this.http.put('http://api.refahkh.ir/api/v1/admin/employee/' + id, data).pipe(map(
      result => result));
  }

  register(data: any) {
    return this.http.post('http://api.refahkh.ir/api/v1/admin/employee', data).pipe(map(
      result => result));
  }

  showEmployees() {
    return this.http.get('http://api.refahkh.ir/api/v1/admin/employee').pipe(map(
      result => result));
  }

  showLoan() {
    return this.http.get('http://api.refahkh.ir/api/v1/admin/loan').pipe(map(
      result => result));
  }

  registerLoan(data: any) {
    return this.http.post('http://api.refahkh.ir/api/v1/admin/loan', data).pipe(map(
      result => result));
  }
  deleteLoan(id: any) {
    return this.http.delete('http://api.refahkh.ir/api/v1/admin/loan/'+id).pipe(map(
      result => result));
  }
  updateLoan(data:any,id: any) {
    return this.http.put('http://api.refahkh.ir/api/v1/admin/loan/'+id,data).pipe(map(
      result => result));
  }


  showAllRequestEmployee(): Observable<any> {
    return this.http.get('http://api.refahkh.ir/api/v1/admin/allRequestEmployee').pipe(map(
      result => result));
  }
  indexLoan() {
    return this.http.get('http://api.refahkh.ir/api/v1/loan').pipe(map(
      result => result));
  }
  countRequestLoan(id:any) {
    return this.http.get('http://api.refahkh.ir/api/v1/countRequest/'+id).pipe(map(
      result => result));
  }
  requestWin(data:any) {
    return this.http.post('http://api.refahkh.ir/api/v1/admin/requestWin/',data).pipe(map(
      result => result));
  }
  setFinalWin(data:any) {
    return this.http.post('http://api.refahkh.ir/api/v1/admin/setFinalWin/',data).pipe(map(
      result => result));
  }
  listWin(id:any) {
    return this.http.post('http://api.refahkh.ir/api/v1/admin/listWinByLoanID/',id).pipe(map(
      result => result));
  }
  listRequestMrs() {
    return this.http.get('http://api.refahkh.ir/api/v1/admin/listRequestMrs/').pipe(map(
      result => result));
  }
}

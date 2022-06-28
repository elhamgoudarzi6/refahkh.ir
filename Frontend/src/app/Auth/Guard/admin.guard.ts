import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { EmployeeService } from '../Employee.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  public currentUser;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if ((this.currentUser === null) || (this.currentUser === undefined)) {
      // this.router.navigate(['./']);
      return true;
    } else {
      return true;
    }
  }

  constructor(private router: Router) {

    // alert( this.service.currentEmployee)
    // this.currentUser=this.service.currentEmployee;
  }
}

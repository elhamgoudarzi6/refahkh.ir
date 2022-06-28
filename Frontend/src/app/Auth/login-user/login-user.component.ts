import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../Employee.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {error} from 'util';
import {EmployeeModel} from '../Employee.model';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {
  userForm: FormGroup;
  public success:boolean=false;
  public successSpinner:boolean=false;

  public employee={
    personalCode:'',
    password:'',
    employee_id:''
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,private serviceEmployee:EmployeeService, private fb: FormBuilder,  private router: Router,) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      'personalCode': new FormControl('', [Validators.required]),
      'password': new FormControl('', Validators.compose([ Validators.required,Validators.maxLength(10),Validators.minLength(10)])),
    });

  }

  onSubmit() {
    this.successSpinner=true;
    this.serviceEmployee.login(this.userForm.value).subscribe((response)=>{
      if(response['success']===true){
        this.successSpinner=false;
        // this.serviceEmployee.xx=response['data'];
        this.employee.employee_id=response['data']['id'];
        this.router.navigate(['panel',this.employee]);
      }
      else{ this.success=true;}
    },
      (error)=>{console.log(error)}
      )
  }
}

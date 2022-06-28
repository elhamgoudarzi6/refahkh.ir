import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {EmployeeService} from '../Employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  userForm: FormGroup;
  public success:boolean=false;
  public successSpinner:boolean=false;
  constructor(private breakpointObserver: BreakpointObserver,private serviceEmployee:EmployeeService, private fb: FormBuilder,  private router: Router) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', Validators.compose([ Validators.required])),
    });
  }
  onSubmit() {
    this.successSpinner=true;
    this.serviceEmployee.loginAdmin(this.userForm.value).subscribe((response)=>{
        if(response['success']===true){
          this.successSpinner=false;
          this.router.navigate(['admin/panel']);
        }
        else{ this.success=true;
        this.router.navigate(['auth/admin']);
           }
      },
      (error)=>{console.log(error)}
    )
  }
}

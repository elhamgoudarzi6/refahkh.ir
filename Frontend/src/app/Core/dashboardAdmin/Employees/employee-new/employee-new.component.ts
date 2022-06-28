import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {ServiceAdminService} from '../../serviceAdmin.service';

@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.scss'],
  providers: [MessageService]
})
export class EmployeeNewComponent implements OnInit {
  public userForm: FormGroup;
  public employee = {
    firstName: '',
    lastName: '',
    fatherName: '',
    address: '',
    nationalCode: '',
    personalCode: '',
    mobile: '',
    acountNum: '',
    typeEmployee: '',
    gender: '',
    phoneNumber: '',
    image:'',
    mrshousehold:'false',
    loanpervious:''
  };

  constructor(private messageService: MessageService,private fb: FormBuilder , private service:ServiceAdminService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      'personalCode': new FormControl('',Validators.required),
      'password': new FormControl(''),
      'firstName': new FormControl('',Validators.required),
      'lastName': new FormControl('',Validators.required),
      'fatherName': new FormControl('',Validators.required),
      'address': new FormControl('',Validators.required),
      'nationalCode': new FormControl('',Validators.required),
      'mobile': new FormControl('',Validators.required),
      'acountNum': new FormControl('',Validators.required),
      'typeEmployee': new FormControl('',Validators.required),
      'gender': new FormControl('',Validators.required),
      'phoneNumber': new FormControl('',Validators.required),
      'image': new FormControl(''),
      'mrshousehold': new FormControl(''),
      'loanpervious': new FormControl('',Validators.required),
    });

  }
  onSubmited(){

    this.service.register(this.userForm.value).subscribe((response) => {

      this.messageService.add({severity:'success', summary:'پرسنل محترم', detail:response['data']});

    });
  }
}

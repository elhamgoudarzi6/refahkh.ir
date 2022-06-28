import {Component, OnInit} from '@angular/core';
import {EmployeeAdminModule} from '../../employeeAdmin.module';
import {ServiceAdminService} from '../../serviceAdmin.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-employess-list',
  templateUrl: './employess-list.component.html',
  styleUrls: ['./employess-list.component.scss'],
  providers: [MessageService]
})
export class EmployessListComponent implements OnInit {
  public employeeModel: EmployeeAdminModule[];
  public cols: any[];
  public userForm: FormGroup;
  public employee = {
    id:'',
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
  displayEdit:boolean=false;
  successSpinner:boolean=true;
  constructor(private messageService: MessageService,private service: ServiceAdminService, private fb:FormBuilder) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'personalCode', header: 'کد پرسنلی '},
      {field: 'firstName', header: 'نام'},
      {field: 'lastName', header: 'نام خانوادگی'},
      {field: 'fatherName', header: 'نام پدر'},
      {field: 'mobile', header: 'شماره همراه '},
      {field: 'nationalCode', header: 'شماره ملی'},
      {field: 'acountNum', header: 'شماره کارت   '},
      {field: 'typeEmployee', header: 'نوع استخدام '}
    ];
    this.userForm = this.fb.group({
      'personalCode': new FormControl('',Validators.required),
      'password': new FormControl('',Validators.required),
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
    this.service.showEmployees().subscribe((response) => {
      if(response['success']===true){
        this.successSpinner=false;
      this.employeeModel = response['data'];
      }
    });
  }
  onUpdate(id:any){
    this.service.update(this.userForm.value,id).subscribe((response)=>{
      console.log(response)
      if(response['success']===true){
        this.messageService.add({severity:'info', summary:'پرسنل محترم', detail:response['data']});
        this.displayEdit =!this.displayEdit;
      }
    })
  }
  showDialogEdit(id: any) {
    for (var i = 0; i < this.employeeModel.length; i++) {
      if (this.employeeModel[i]['_id'] === id) {
        this.employee.id = this.employeeModel[i]['_id'];
        this.employee.firstName = this.employeeModel[i]['firstName'];
        this.employee.lastName = this.employeeModel[i]['lastName'];
        this.employee.fatherName = this.employeeModel[i]['fatherName'];
        this.employee.address = this.employeeModel[i]['address'];
        this.employee.personalCode = this.employeeModel[i]['personalCode'];
        this.employee.phoneNumber = this.employeeModel[i]['phoneNumber'];
        this.employee.acountNum = this.employeeModel[i]['acountNum'];
        this.employee.typeEmployee = this.employeeModel[i]['typeEmployee'];
        this.employee.nationalCode = this.employeeModel[i]['nationalCode'];
        this.employee.mobile = this.employeeModel[i]['mobile'];
        this.employee.gender = this.employeeModel[i]['gender'];
        this.employee.loanpervious = this.employeeModel[i]['loanpervious'];
        this.employee.mrshousehold = this.employeeModel[i]['mrshousehold'];
      }
    }
          this.displayEdit =!this.displayEdit;
    }
}

import {Component, OnInit} from '@angular/core';

import {EmployeeDashboardService} from '../employee-dashboard.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestLoanModel} from './requestLoan.model';
import {log} from 'util';
import {MessageService} from 'primeng/api';
import {EmployeeService} from '../../../Auth/Employee.service';

@Component({
  selector: 'app-request-loan',
  templateUrl: './request-loan.component.html',
  styleUrls: ['./request-loan.component.scss'],
  providers: [MessageService]
})
export class RequestLoanComponent implements OnInit {
  public requestLoanModel: RequestLoanModel[];
  public cols: any[];
  public dataRecived = {
    personalCode: '',
    password:''
  };
  public deleteActive: boolean = false;
  public resultLottery: boolean = false;
  public message: boolean = false;
  public messageNo: boolean = false;
  public resultData: any[] = [];
public spinnerSuccess:boolean=true;
public titleLoan;
public firstName;
public lastName;
  constructor(private _router: Router,  private messageService: MessageService, private service: EmployeeDashboardService, private activatedRoute: ActivatedRoute) {
    this.cols = [
      {field: 'title', header: 'عنوان تسهیلات'},
      {field: 'amount', header: 'مقدار'},
      {field: 'number', header: 'تعداد اقساط'},
      {field: 'ceilingNum', header: 'تعداد اقساط'},
      {field: 'condition', header: 'شرط'},
      {field: 'percent', header: 'درصد '},

    ];


  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params) => {
        this.dataRecived.personalCode = params.get('personalCode');
       this.dataRecived.password = params.get('password');
      }
    );
    this.service.login(this.dataRecived).subscribe((response)=>{

      if(response['success']===true){
        this.firstName=response['data']['firstName'];
        this.lastName=response['data']['lastName'];

      }
    })
    this.loadRequestLoan();

  }

  loadRequestLoan() {
    this.service.showRequestLoan(this.dataRecived).subscribe((response) => {
      console.log(response)
      if (response['success'] === true) {
        this.deleteActive = true;
        this.titleLoan=response['data']['title'];

        // if(response['data']['title']==='تسهیلات مرابحه یک' || response['data']['title']==='تسهیلات مرابحه دو'|| response['data']['title']==='تسهیلات مرابحه سه'){
        //   this.titleLoan='تسهیلات مرابحه';
        // }
        // else {
        //   this.titleLoan=response['data']['title'];
        // }
        this.requestLoanModel = response['data'];
      }
      return this.requestLoanModel;
    });
    this.service.showResult(this.dataRecived).subscribe((response) => {
    // console.log(response)
      let data = response['data'];
      this.resultData=data;
      if (data['result'] === true) {
        this.message = true;
        this.spinnerSuccess=false;
        this.messageNo = false;
        this.resultLottery = data['result'];
      } else {
        this.spinnerSuccess=false;
        this.message = false;
        this.messageNo = true;
      }
    });
  }

  onDelete() {
    this.service.deleteRequestLoan(this.dataRecived).subscribe((response) => {
      if (response['success'] === true) {
        this.deleteActive = !this.deleteActive;
        this.loadRequestLoan();
        this.messageService.add({severity: 'success', summary: 'پرسنل محترم', detail: response['data']});

      }
    });

  }
}

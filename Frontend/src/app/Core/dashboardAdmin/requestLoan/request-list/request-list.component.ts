import {Component, OnInit} from '@angular/core';
import {ServiceAdminService} from '../../serviceAdmin.service';
import {EmployeeAdminModule} from '../../employeeAdmin.module';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  public employeeModel: EmployeeAdminModule[];
  public countRequestLoan;
  public cols: any[];
  public countLoan: any[] = [];
  successSpinner: boolean = true;
  constructor(private service: ServiceAdminService) {
    this.cols = [
      {field: 'personalCode', header: 'کد پرسنلی '},
      {field: 'firstName', header: 'نام'},
      {field: 'lastName', header: 'نام خانوادگی'},
      {field: 'nationalCode', header: 'شماره ملی'},
      {field: 'titleLoan', header: 'عنوان تسهیلات'}
    ];
  }

  ngOnInit() {
    this.service.showAllRequestEmployee().subscribe((response) => {
      if (response['success'] === true) {
        this.employeeModel = response['data'];
        this.countRequestLoan = this.employeeModel.length;
        this.successSpinner = false;
      }
    });
    this.service.indexLoan().subscribe((response) => {
      for (var i = 0; i < response['data'].length; i++) {
        let id = response['data'][i]['_id'];
        let title=response['data'][i]['title'];
        this.service.countRequestLoan(id).subscribe((response) => {
          this.countLoan.push({title: title, count: response['count']});
        });
      }

    });


  }

}

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouteAdminDashboardRoutingModule} from './route-admin-dashboard-routing.module';
import {IndexAdminComponent} from './index-admin/index-admin.component';
import {SharedmoduleModule} from '../../SharedModules/sharedmodule.module';
import {BodyDashboardComponent} from './body-dashboard/body-dashboard.component';
import {EmployeeNewComponent} from './Employees/employee-new/employee-new.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EmployessListComponent} from './Employees/employess-list/employess-list.component';
import {LoanNewComponent} from './Loan/loan-new/loan-new.component';
import {RequestListComponent} from './requestLoan/request-list/request-list.component';
import {LotteryListComponent} from './Lottery/lottery-list/lottery-list.component';
import {LotteryWinComponent} from './Lottery/lottery-win/lottery-win.component';
import {LotteryMrsComponent} from './Lottery/lottery-mrs/lottery-mrs.component';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  declarations: [IndexAdminComponent, BodyDashboardComponent, EmployeeNewComponent, EmployessListComponent, LoanNewComponent, RequestListComponent, LotteryListComponent, LotteryWinComponent, LotteryMrsComponent],
  imports: [
    CommonModule,
    RouteAdminDashboardRoutingModule,
    SharedmoduleModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPrintModule
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class RouteAdminDashboardModule {
}

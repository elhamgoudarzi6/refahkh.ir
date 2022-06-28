import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexAdminComponent} from './index-admin/index-admin.component';
import {BodyDashboardComponent} from './body-dashboard/body-dashboard.component';
import {EmployeeNewComponent} from './Employees/employee-new/employee-new.component';
import {EmployessListComponent} from './Employees/employess-list/employess-list.component';
import {LoanNewComponent} from './Loan/loan-new/loan-new.component';
import {AdminGuard} from '../../Auth/Guard/admin.guard';
import {RequestListComponent} from './requestLoan/request-list/request-list.component';
import {LotteryListComponent} from './Lottery/lottery-list/lottery-list.component';
import {LotteryWinComponent} from './Lottery/lottery-win/lottery-win.component';
import {LotteryMrsComponent} from './Lottery/lottery-mrs/lottery-mrs.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: IndexAdminComponent,
    children: [{
      path: '',
      component: BodyDashboardComponent
    }]
  },
  {
    path: '',
    canActivate: [AdminGuard],
    component: IndexAdminComponent,
    children: [{
      path: 'newEmployee',
      component: EmployeeNewComponent
    }]
  },
  {
    path: '',
    canActivate: [AdminGuard],
    component: IndexAdminComponent,
    children: [{
      path: 'listEmployee',
      component: EmployessListComponent
    }]
  },
  {
    path: '',

    component: IndexAdminComponent,
    children: [{
      path: 'loan',
      component: LoanNewComponent
    }]
  },
  {
    path: '',
    canActivate: [AdminGuard],
    component: IndexAdminComponent,
    children: [{
      path: 'listRequest',
      component: RequestListComponent
    }]
  },
  {
    path: '',
    canActivate: [AdminGuard],
    component: IndexAdminComponent,
    children: [{
      path: 'lottery',
      component: LotteryListComponent
    }]
  },
  {
    path: '',
    canActivate: [AdminGuard],
    component: IndexAdminComponent,
    children: [{
      path: 'lotteryWin',
      component: LotteryWinComponent
    }]
  },
  {
    path: '',
    canActivate: [AdminGuard],
    component: IndexAdminComponent,
    children: [{
      path: 'listRequestMrs',
      component: LotteryMrsComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteAdminDashboardRoutingModule {
}

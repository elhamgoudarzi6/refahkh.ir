import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ContentBodyComponent} from './content-body/content-body.component';
import {PersonalDetailsComponent} from './personal-details/personal-details.component';
import {RequestLoanComponent} from './request-loan/request-loan.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent ,
    children:[{
      path:'',
      component:ContentBodyComponent
    }]
  },
  {
    path: '',
    component: IndexComponent ,
    children:[{
      path: 'personal',
      component: PersonalDetailsComponent,
    }]
  },
  {
    path: '',
    component: IndexComponent ,
    children:[{
      path: 'loanNew',
      component: RequestLoanComponent,
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteEmployeeRoutingModule {
}

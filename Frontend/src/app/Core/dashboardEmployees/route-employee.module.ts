import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteEmployeeRoutingModule } from './route-employee-routing.module';
import {IndexComponent} from './index/index.component';
import {SharedmoduleModule} from '../../SharedModules/sharedmodule.module';
import { ContentBodyComponent } from './content-body/content-body.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { RequestLoanComponent } from './request-loan/request-loan.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RequestListComponent} from '../dashboardAdmin/requestLoan/request-list/request-list.component';
import {NgxPrintModule} from 'ngx-print';


@NgModule({
  declarations: [IndexComponent, ContentBodyComponent, PersonalDetailsComponent, RequestLoanComponent],
  imports: [
    CommonModule,
    RouteEmployeeRoutingModule,
    SharedmoduleModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPrintModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class RouteEmployeeModule { }

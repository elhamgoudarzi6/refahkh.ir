import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import {LoginUserComponent} from './login-user/login-user.component';

import {SharedmoduleModule} from '../SharedModules/sharedmodule.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material';
import { LoginAdminComponent } from './login-admin/login-admin.component';
@NgModule({
  declarations: [LoginUserComponent, LoginAdminComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedmoduleModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AuthModule { }

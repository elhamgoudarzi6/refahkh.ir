import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginUserComponent} from './login-user/login-user.component';
import {LoginAdminComponent} from './login-admin/login-admin.component';
const routes: Routes = [
  {
    path:'',
    component:LoginUserComponent
  },
  {
    path:'admin',
    component:LoginAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

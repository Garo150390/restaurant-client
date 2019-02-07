import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../core/services/user.service';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import { AuthComponent } from './component/auth.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService]
})
export class AuthModule {
}

import { Router} from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ValidatorHelper } from '../../core/helpers/validator.helper';
import { StorageService } from '../../core/services/storage.service';
import { LoginService } from '../../core/services/login.service';
import { AuthService } from '../../core/services/auth.service';
import { UserResponse } from '../../core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup;

  constructor(private loginService: LoginService,
              private authService: AuthService,
              private router: Router) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern(ValidatorHelper.emailRegEx),
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.pattern(ValidatorHelper.passwordRegEx),
        Validators.minLength(6),
        Validators.maxLength(20)
      ])
    });
  }

  public validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  public submitLoginForm(): void {
    if (this.loginForm.invalid) {
      console.log(this.loginForm);
      this.validateAllFormFields(this.loginForm);
    } else {
      console.log(this.loginForm.getRawValue());
      this.loginService.login(this.loginForm.value)
        .subscribe((user: UserResponse) => {
          console.log('success');
          this.authService.currentUserSubject.next(user.user);
          StorageService.saveItem('accessToken', user.tokens.accessToken);
          StorageService.saveItem('refreshToken', user.tokens.refreshToken);
          this.router.navigateByUrl('/');
        }, (err) => {
          Object.keys(err.error).forEach((key) => {
            this.loginForm.controls[key].setErrors({'incorrect': true});
          });
        });
      // this.loginForm.reset();
    }
  }

  public alertValidate(event) {
    if (this.loginForm.controls[event.name].status === 'INVALID') {
      event.classList.add('borderBottom');
    } else {
      event.classList.remove('borderBottom');
    }
  }
}

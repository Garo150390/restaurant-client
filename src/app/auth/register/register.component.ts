import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ValidatorHelper } from '../../core/helpers/validator.helper';
import { StorageService } from '../../core/services/storage.service';
import { CustomValidators } from '../../shared/custom-validators';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) {
    this.registerForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.pattern(ValidatorHelper.nameRegEx)
      ]),
      'surname': new FormControl('', [
        Validators.required,
        Validators.pattern(ValidatorHelper.nameRegEx)
      ]),
      'age': new FormControl('', [
        Validators.required,
        Validators.pattern(ValidatorHelper.ageRegEx),
        Validators.minLength(3),
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern(ValidatorHelper.emailRegEx),
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.pattern(ValidatorHelper.passwordRegEx),
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),
      'confirmPassword': new FormControl('', [
        Validators.required,
        Validators.pattern(ValidatorHelper.passwordRegEx),
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),

      'city': new FormControl('', [
        Validators.required,
        Validators.pattern(ValidatorHelper.nameRegEx)
      ]),
      'country': new FormControl('', [
        Validators.required,
        Validators.pattern(ValidatorHelper.nameRegEx)
      ]),
      'image': new FormControl('', [
        Validators.pattern(ValidatorHelper.imageRegEx)
      ]),


    }, {validators: CustomValidators.passwordsMatch});
  }

  ngOnInit() {
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

  public alertValidate(event) {
    if (this.registerForm.controls[event.name].status === 'INVALID') {
      event.classList.add('borderBottom');
    } else {
      event.classList.remove('borderBottom');
    }
  }

  submitRegisterForm() {
    if (this.registerForm.invalid) {
      this.validateAllFormFields(this.registerForm);
    } else {
      this.userService.createUser(this.registerForm.value)
        .subscribe((user) => {
          console.log(user);
          this.authService.currentUserSubject.next(user.user);
          StorageService.saveItem('accessToken', user.tokens.accessToken);
          StorageService.saveItem('refreshToken', user.tokens.refreshToken);
          this.router.navigateByUrl('/');
        }, (err) => {
          console.log(err);
          Object.keys(err.error).forEach((key) => {
            this.registerForm.controls[key].setErrors({'incorrect': true});
          });
        });
    }
  }

}

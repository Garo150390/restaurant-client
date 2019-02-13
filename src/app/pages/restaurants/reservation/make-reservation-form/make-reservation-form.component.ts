import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-make-reservation-form',
  templateUrl: './make-reservation-form.component.html',
  styleUrls: ['./make-reservation-form.component.scss']
})
export class MakeReservationFormComponent implements OnInit {

  public reserveForm: FormGroup;
  public timer = {hour: 13, minute: 30};
  public date: FormControl;
  // public time: FormControl;
  public for: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  private createFormControls(): void {
    this.date = new FormControl('', [Validators.required]);
    this.for = new FormControl('1');
  }

  private createForm(): void {
    this.reserveForm = new FormGroup({
      'date': this.date,
      'for': this.for,
    });
  }

  public validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
        console.log('ok');
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  public alertValidate(event) {
    if (this[event.name].status === 'INVALID') {
      event.classList.add('bg-danger');
    } else {
      event.classList.remove('bg-danger');
    }
  }

  submitReservForm() {
    console.log((this.date.dirty && this.date.hasError('required'))
      || (this.date.touched && this.date.hasError('required')));
    if (this.reserveForm.invalid) {
      this.validateAllFormFields(this.reserveForm);
    } else {
      console.log(this.reserveForm.getRawValue());
    }
  }


}

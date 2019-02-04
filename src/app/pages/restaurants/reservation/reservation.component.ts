import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  public reservForm: FormGroup;
  public time = {hour: 13, minute: 30};

  constructor() {
    this.reservForm = new FormGroup({
      'date': new FormControl('', [
        Validators.required,
      ]),
      'time': new FormControl('', [
        Validators.required,
      ])
    });
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
    if (this.reservForm.controls[event.name].status === 'INVALID') {
      event.classList.add('bg-danger');
    } else {
      event.classList.remove('bg-danger');
    }
  }

  submitReservForm() {
    if (this.reservForm.invalid) {
      this.validateAllFormFields(this.reservForm);
    } else {
      console.log(this.reservForm.getRawValue());
    }
  }


}

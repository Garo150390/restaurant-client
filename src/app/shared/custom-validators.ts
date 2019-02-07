import { FormGroup } from '@angular/forms';

export class CustomValidators {

  public static passwordsMatch(frm: FormGroup) {
    return frm.get('password').value === frm.get('confirmPassword').value
      ? null : {'confirmPassword': true};
  }
}

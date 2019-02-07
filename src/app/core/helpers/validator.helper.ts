export class ValidatorHelper {
  static readonly emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  static readonly nameRegEx = /^[A-Za-z\-' ']+$/;

  static readonly phoneRegex = /((\(\d{3}\) ?)|(\d{2}-))?\d{3}-\d{2}-\d{2}-\d{2}$/;

  static readonly ageRegEx = /^[0-9]+$/;

  static readonly passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

  static readonly imageRegEx = /\S+(?:jpg|jpeg|png)$/;

}

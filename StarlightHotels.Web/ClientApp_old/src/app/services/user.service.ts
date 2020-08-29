import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  readonly BaseURI = 'https://localhost:44315/api';
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  formModel = this.fb.group({
    UserName : ['', Validators.required],
    Email : ['', Validators.email],
    FullName : ['', Validators.required],
    Passwords : this.fb.group({
      Password : ['', Validators.required, Validators.minLength(4)],
      ConfirmPassword : ['', Validators.required]
    }, {validator: this.comparePasswords })
  });

  // tslint:disable-next-line: typedef
  comparePasswords(fb: FormGroup){
    // tslint:disable-next-line: prefer-const
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    // PasswordMismatch
    // confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors)
    {
      // tslint:disable-next-line: triple-equals
      if (fb.get('Password').value != confirmPasswordCtrl.value)
      {
        confirmPasswordCtrl.setErrors({passwordMismatch: true});
      }
      else
      {
        confirmPasswordCtrl.setErrors(null);
      }
    }
  }

  // tslint:disable-next-line: typedef
  register()
  {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password,
    };
    return this.http.post(this.BaseURI + '/Account/Register', body);
  }

  // tslint:disable-next-line: typedef
  login(formData)
  {
    return this.http.post(this.BaseURI + '/Account/Login', formData);
  }

  // tslint:disable-next-line: typedef
  getUserProfile()
  {
    return this.http.get<UserModel>(this.BaseURI + '/UserProfile');
  }

  // tslint:disable-next-line: typedef
  getUserProfileAsync()
  {
    return this.http.get<UserModel>(this.BaseURI + '/UserProfile').toPromise();
  }
}

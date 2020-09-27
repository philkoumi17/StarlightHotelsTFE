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
    userName: ['', Validators.required],
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    dateNaissance: ['', Validators.required],
    sexe: ['', Validators.required],
    rue: ['', Validators.required],
    numeroRue: ['', Validators.required],
    codePostal: ['', Validators.required],
    ville: ['', Validators.required],
    paysId: ['', Validators.required],
    email : ['', Validators.email],
    fullName : ['', Validators.required],
    passwords : this.fb.group({
      password : ['', Validators.required, Validators.minLength(4)],
      confirmPassword : ['', Validators.required]
    }, {validator: this.comparePasswords })
  });

  comparePasswords(fb: FormGroup)
  {
    let confirmPasswordCtrl = fb.get('confirmPassword');
    // PasswordMismatch
    // confirmPswrdCtrl.errors={passwordMismatch:true}
    if(confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors)
    {
      if(fb.get('password').value != confirmPasswordCtrl.value)
      {
        confirmPasswordCtrl.setErrors({passwordMismatch: true});
      }
      else
      {
        confirmPasswordCtrl.setErrors(null);
      }
    }
  }

  register()
  {
    var body: UserModel = {
      userName: this.formModel.value.userName,
      email: this.formModel.value.email,
      nom: this.formModel.value.nom,
      prenom: this.formModel.value.prenom,
      dateNaissance: this.formModel.value.dateNaissance,
      sexe: this.formModel.value.sexe,
      rue: this.formModel.value.rue,
      numeroRue: this.formModel.value.numeroRue,
      codePostal: this.formModel.value.codePostal,
      ville: this.formModel.value.ville,
      paysId: this.formModel.value.paysId,
      fullName: this.formModel.value.fullName,
      password: this.formModel.value.passwords.password,
    };
    console.log(body);
    return this.http.post(this.BaseURI + '/Account/Register', body);
  }

  login(formData)
  {
    return this.http.post(this.BaseURI + '/Account/Login', formData);
  }

  getUserProfile()
  {
    return this.http.get<UserModel>(this.BaseURI + '/UserProfile');
  }

  getUserProfileAsync()
  {
    return this.http.get<UserModel>(this.BaseURI + '/UserProfile').toPromise();
  }
}

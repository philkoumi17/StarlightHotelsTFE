import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilisateurModel } from '../models/user.model';
import { Pays } from '../models/pays.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  readonly BaseURI = 'https://localhost:44315/api';
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  formModel = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    dateNaissance: ['', Validators.required],
    sexe: ['', Validators.required],
    rue: ['', Validators.required],
    numeroRue: ['', Validators.required],
    codePostal: ['', Validators.required],
    ville: ['', Validators.required],
    paysId: [null, [Validators.required]],
    email : ['', Validators.email],
    passwords : this.fb.group({
      password : ['', Validators.required, Validators.minLength(4)],
      confirmPassword : ['', Validators.required]
    }, { validator: this.comparePasswords }),
    phoneNumber: ['', Validators.required]
  });

  comparePasswords(fb: FormGroup)
  {
    let confirmPasswordCtrl = fb.get('confirmPassword');
    // PasswordMismatch
    // confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors)
    {
      if (fb.get('password').value != confirmPasswordCtrl.value)
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
    var body: UtilisateurModel = {
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
      password: this.formModel.value.passwords.password,
      phoneNumber: this.formModel.value.phoneNumber
    };

    return this.http.post(this.BaseURI + '/Account/Register', body);
  }

  login(formData)
  {
    return this.http.post(this.BaseURI + '/Account/Login', formData);
  }

  getUserProfile()
  {
    return this.http.get<UtilisateurModel>(this.BaseURI + '/UserProfile');
  }

  getUserProfileAsync()
  {
    console.log(this.BaseURI + '/UserProfile');
    return this.http.get<UtilisateurModel>(this.BaseURI + '/UserProfile').toPromise();
  }

  getAllCountries(): Observable<Pays[]> {
    return this.http.get<Pays[]>(`${this.BaseURI}/Account/GetAllCountries`);
  }
}

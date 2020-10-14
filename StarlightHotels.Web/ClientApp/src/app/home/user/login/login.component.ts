import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  formModel;

  @Output() closeDialog: EventEmitter<any> = new EventEmitter();

  constructor(private service: UserService, private router: Router, private snackBar: MatSnackBar,
              private authService: AuthenticationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formModel = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (localStorage.getItem('token') != null)
    {
      this.router.navigateByUrl('/home');
    }
  }

  // tslint:disable-next-line: typedef
  onSubmit()
  {
    this.service.login(this.formModel.getRawValue()).subscribe(
      (res: any) => {
        this.authService.setToken(res.token);
        this.router.navigateByUrl('/home');
      },
      err => {
        // tslint:disable-next-line: triple-equals
        if (err.status == 400)
        {
          // this.toastr.error('Incorrect username or password !', 'Authentication failed');
          this.snackBar.open('Incorrect username or password !, Authentication failed!', '', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: 'snackbar-danger',
          });
        }
        else
        {
          console.log(err);
        }
      }
    );
    this.closeDialog.emit();
  }
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  };

  @Output() closeDialog: EventEmitter<any> = new EventEmitter();

  constructor(private service: UserService, private router: Router, private toastr: ToastrService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null)
    {
      this.router.navigateByUrl('/home');
    }
  }

  // tslint:disable-next-line: typedef
  onSubmit(form: NgForm)
  {
    this.service.login(form.value).subscribe(
      (res: any) => {
        this.authService.setToken(res.token);
        this.router.navigateByUrl('/home');
      },
      err => {
        // tslint:disable-next-line: triple-equals
        if (err.status == 400)
        {
          this.toastr.error('Incorrect username or password !', 'Authentication failed');
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

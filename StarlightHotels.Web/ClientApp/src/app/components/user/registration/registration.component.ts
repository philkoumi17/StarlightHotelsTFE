import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit
{
  constructor(public service: UserService, private toastr: ToastrService,
              public dialogRef: MatDialogRef<RegistrationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit(): void{
    this.service.register().subscribe(
      (res:any) => {
        if(res.succeeded)
        {
          this.service.formModel.reset();
          this.toastr.success('New user created', 'Registration successful !');
          this.dialogRef.close();
        }
        else
        {
          res.errors.forEach(element => {
            switch(element.code)
            {
              case 'DuplicateUserName':
                // Username is already taken
                this.toastr.error('Username is already taken', 'Registration failed !');
                break;
              
              default:
                // Registration failed
                this.toastr.error(element.description, 'Registration failed !');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
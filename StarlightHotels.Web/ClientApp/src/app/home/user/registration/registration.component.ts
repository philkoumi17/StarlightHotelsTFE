import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Pays } from '../../../models/pays.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit
{
  allCountries: Pays[];
  maxDate;

  constructor(public service: UserService, private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RegistrationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.service.formModel.reset();
    this.service.getAllCountries().subscribe(
      (data) => {
        this.allCountries = data;
      }
    );
    this.maxDate = new Date();
  }

  onSubmit(): void{
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded)
        {
          this.service.formModel.reset();
          // this.toastr.success('New user created', 'Registration successful !');
          this.snackBar.open('New user created, Registration successful !', '', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'snackbar-success',
          });
          this.dialogRef.close();
        }
        else
        {
          res.errors.forEach(element => {
            switch (element.code)
            {
              case 'DuplicateUserName':
                // Username is already taken
                // this.toastr.error('Username is already taken', 'Registration failed !');
                this.snackBar.open('Username is already taken, Registration failed !', '', {
                  duration: 2000,
                  verticalPosition: 'top',
                  horizontalPosition: 'right',
                  panelClass: 'snackbar-danger',
                });
                break;
              default:
                // Registration failed
                // this.toastr.error(element.description, 'Registration failed !');
                this.snackBar.open(element.description + ', Registration failed !', '', {
                  duration: 2000,
                  verticalPosition: 'top',
                  horizontalPosition: 'right',
                  panelClass: 'snackbar-danger',
                });
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

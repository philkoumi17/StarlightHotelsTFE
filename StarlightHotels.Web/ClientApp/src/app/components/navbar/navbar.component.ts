import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication.service';
import { UserComponent } from '../user/user.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { HotelCreateComponent } from '../hotel/hotel-create/hotel-create.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  user: UserModel = {
    fullName: '',
    email: '',
    userName: ''
  };

  constructor(public dialog: MatDialog, private router: Router, private authService: AuthenticationService,
              private userService: UserService) { }

  // tslint:disable-next-line: typedef
  async ngOnInit() {
    if (this.authService.isAuthenticated())
    {
      await this.userService.getUserProfileAsync().then(
        (data) => {
          this.user = data;
          console.log(this.user.fullName);
        }
      );
    }
  }

  openUserDialog(): void {
    console.log('this.openUserDialog()');
    const dialogRef = this.dialog.open(UserComponent, {
      disableClose: false,
      width: '50%',
      height: '80%',
      data: { data: null}
    });
  }

  // A dialog for hotel's creation
  // tslint:disable-next-line: typedef
  async openDialogHotelForm()
  {
    // tslint:disable-next-line: no-debugger
    debugger;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1000px';
    dialogConfig.height = '1000px';
    const dialogRef = this.dialog.open(HotelCreateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async result => {
      if (result === 'ok')
      {
        // refresh table
        // await this.loadData();
        this.router.navigateByUrl('/hotel');
      }
    });
  }

  // tslint:disable-next-line: typedef
  isConnected()
  {
    return this.authService.isAuthenticated();
  }

  // tslint:disable-next-line: typedef
  onLogout()
  {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}

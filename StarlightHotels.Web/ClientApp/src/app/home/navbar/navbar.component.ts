import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication.service';
import { UserComponent } from '../user/user.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/models/user.model';

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

  async ngOnInit() {
    if(this.authService.isAuthenticated())
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

  isConnected()
  {
    return this.authService.isAuthenticated();
  }

  onLogout()
  {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserComponent } from '../user/user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
  }

  openUserDialog(): void {
    console.log("this.openUserDialog()");
    const dialogRef = this.dialog.open(UserComponent, {
      disableClose: true,
      width: '50%',
      height: '80%',
      data: { data: null}
    });
  }
  
  onLogout()
  {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}
import { Component, OnInit, Inject } from '@angular/core';
import { RegistrationComponent } from '../user/registration/registration.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openUserDialog(): void {
    console.log("this.openUserDialog()");
    const dialogRef = this.dialog.open(RegistrationComponent, {
    disableClose: true,
    width: '50%',
    height: '',
    data: { data: null}
  });
}}

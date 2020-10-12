import { Component, OnInit } from '@angular/core';
import { UtilisateurModel } from '../../../models/user.model';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: UtilisateurModel;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.currentUserData.subscribe(data => this.user = data);
  }
}

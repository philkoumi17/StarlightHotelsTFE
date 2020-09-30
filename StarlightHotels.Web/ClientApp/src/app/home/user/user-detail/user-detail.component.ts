import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Utilisateur } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: Utilisateur;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        this.user = res;
      },
      err => {
        console.log(err);
      },
    );
  }
}

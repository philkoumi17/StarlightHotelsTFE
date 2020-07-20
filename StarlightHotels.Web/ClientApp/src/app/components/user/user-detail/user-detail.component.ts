import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: UserModel;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (data) =>{
        this.user = data;
      }
    );
  }

}
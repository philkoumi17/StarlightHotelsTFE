import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    './home.component.css'
  ]
})
export class HomeComponent implements OnInit {
  title = 'StarlightHotels';
  constructor(private router: Router, private service: UserService) { }

  ngOnInit(): void {
  }
}

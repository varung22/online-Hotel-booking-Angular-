import { Component, OnInit } from '@angular/core';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title ='MyHotel';
  isLoggedIn = false;
  
  constructor(private userServiceService: UserServiceService) {}

  ngOnInit() {
    this.isLoggedIn = this.userServiceService.isLoggedIn();
    this.userServiceService.getLoggedInName.subscribe(item => this.isLoggedIn = true);
  }

  logout() {
    this.userServiceService.logout();
    this.isLoggedIn = false;
  }
}

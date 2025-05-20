import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor() {}
  @Input() currentUser!: User;
  @Input() authService!: AuthService;

  async ngOnInit(): Promise<void> {
    try {
      this.currentUser.isAdmin = await this.authService.isAdmin();
    } catch (err) {
      console.log(err);
    }
  }

  logout() {
    this.authService.doLogout();
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {
  currentUser!: User;

  constructor(public authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.currentUser = await this.authService.getCurrentUser();
  }
}

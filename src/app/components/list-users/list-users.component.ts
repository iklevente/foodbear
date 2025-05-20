import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsers();
  }

  removeUser(user: User) {
    this.users = this.users.filter((u) => u.id !== user.id);
  }
}

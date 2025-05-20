import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  constructor(private authService: AuthService) {}
  @Input() user!: User;
  @Output() onUserDeleted = new EventEmitter<any>();

  ngOnInit(): void {
    if (!this.user)
      this.authService.getUserProfile().subscribe((user) => (this.user = user));
  }

  async deleteUser() {
    try {
      await this.authService.deleteUser(this.user.id);
      this.onUserDeleted.emit();

      const currentUser = (await this.authService.getCurrentUser()).id;
      if (currentUser === this.user.id) {
        this.authService.doLogout();
      }
    } catch (err: any) {
      if (
        err.status === 403 ||
        err.message.includes('cannot delete your own profile')
      ) {
        alert(
          'Nem törölheted a saját profilodat.\nKérjük, lépj kapcsolatba az adminisztrátorral a profil törléséhez.'
        );
      } else {
        alert('Hiba történt a felhasználó törlése során.');
      }
      console.error(err);
    }
  }
}

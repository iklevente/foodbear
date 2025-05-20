import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  registerForm: FormGroup;
  serversideError: boolean = false;

  constructor(public authService: AuthService, public fb: FormBuilder) {
    this.registerForm = this.fb.group({
      id: [null],
      name: [
        '',
        { validators: [Validators.required, Validators.minLength(3)] },
      ],
      email: ['', { validators: [Validators.required, Validators.email] }],
      isAdmin: [false, { validators: [Validators.required] }],
      password: [
        '',
        { validators: [Validators.required, Validators.minLength(8)] },
      ],
      confirmPassword: [
        '',
        { validators: [Validators.required, Validators.minLength(8)] },
      ],
    });
  }

  ngOnInit(): void {}

  async addUser() {
    try {
      const newUser: User = {
        id: this.registerForm.value.id,
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        isAdmin: this.registerForm.value.isAdmin == 'true',
        password: this.registerForm.value.password,
      };
      const returndUser = await this.authService.addUser(newUser);
      this.serversideError = false;
    } catch (err) {
      console.log(err);
      this.serversideError = true;
    }
  }

  passwordMismatch() {
    if (
      this.registerForm.get('password')!.value !==
      this.registerForm.get('confirmPassword')!.value
    ) {
      this.registerForm.get('confirmPassword')!.setErrors({ mismatch: true });
      return true;
    }
    return false;
  }
}

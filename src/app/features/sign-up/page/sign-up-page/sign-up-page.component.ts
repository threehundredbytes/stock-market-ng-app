import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { User } from '../../model/User';
import { UserRole } from '../../model/UserRole';
import { AuthenticationService } from '../../../../core/auth/authentication.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  signUpForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
    ]),
    role: new FormControl(UserRole.CLIENT, [
      Validators.required,
    ])
  })

  public userRoles = Object.values(UserRole);

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.authenticationService.login();
  }

  public signUp() {
    let user: User = {
      username: this.usernameControl.value,
      password: this.passwordControl.value,
      role: this.roleControl.value === UserRole.BUSINESS ? UserRole.BUSINESS : UserRole.CLIENT
    }

    this.userService.signUp(user);
  }

  getUsernameInputValidationErrorMessage() {
    if (this.usernameControl.hasError('required')) {
      return 'Username is required';
    }

    if (this.usernameControl.hasError('minlength')) {
      return 'Username minimal length is 3 characters';
    }

    return this.usernameControl.hasError('maxlength') ? 'Username maximum length is 16 characters' : '';
  }

  getPasswordInputValidationErrorMessage() {
    if (this.passwordControl.hasError('required')) {
      return 'Password is required';
    }

    if (this.passwordControl.hasError('minlength')) {
      return 'Password minimal length is 8 characters';
    }

    return this.passwordControl.hasError('maxlength') ? 'Password maximum length is 32 characters' : '';
  }

  get usernameControl(): AbstractControl {
    return this.signUpForm.controls.username;
  }

  get passwordControl(): AbstractControl {
    return this.signUpForm.controls.password;
  }

  get roleControl(): AbstractControl {
    return this.signUpForm.controls.role;
  }
}

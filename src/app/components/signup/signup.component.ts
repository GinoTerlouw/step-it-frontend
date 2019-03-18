import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {JwtService} from '../../services/jwt/jwt.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public userForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(255)
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(255)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255)
    ])
  });

  constructor(
    private jwtService: JwtService,
    private router: Router
  ) {
    if (this.jwtService.isAuthenticated()) {
      this.router.navigate(['/me/start']);
    }
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.jwtService.signup(this.userForm.value);
  }
}

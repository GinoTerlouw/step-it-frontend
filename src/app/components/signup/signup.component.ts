import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {JwtService} from '../../services/jwt/jwt.service';
import {Router} from '@angular/router';
import RouteInterface from '../../interfaces/route.interface';
import {GeneralStateService} from '../../services/generalState/general-state.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy, RouteInterface {
  public readonly BACKGROUND_COLOR: Colors = 'orange';
  public readonly ACCENT_COLOR: Colors = 'purple';
  public readonly MENU_VISIBLE: boolean = false;

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
    private generalStateService: GeneralStateService,
    private jwtService: JwtService,
    private router: Router
  ) {
    if (this.jwtService.isAuthenticated()) {
      this.router.navigate(['/me/start']);
    }

    this.setAccentColor();
    this.setBackGroundColor();
    this.setMenuVisibility();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSubmit(): void {
    this.jwtService.signup(this.userForm.value);
  }

  setBackGroundColor(): void {
    this.generalStateService.emitBackgroundColorChangeEvent(this.BACKGROUND_COLOR);
  }

  setAccentColor(): void {
    this.generalStateService.emitAccentColorChangeEvent(this.ACCENT_COLOR);
  }

  setMenuVisibility(): void {
    this.generalStateService.emitMenuVisibilityEvent(this.MENU_VISIBLE);
  }
}

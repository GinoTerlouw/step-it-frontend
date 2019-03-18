import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DebugElement} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AbstractControl, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login.component';
import {JwtService} from '../../services/jwt/jwt.service';

fdescribe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let element: DebugElement;
  let compiled;
  const formBuilder: FormBuilder = new FormBuilder();


  beforeAll(async(() => {

  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        RouterTestingModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        ReactiveFormsModule,
      ],
      providers: [
        JwtService,
        {provide: FormBuilder, useValue: formBuilder}
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  }));

  it('should render LoginComponent', async(() => {
    fixture.detectChanges();

    element = fixture.debugElement.componentInstance;
    compiled = fixture.debugElement.nativeElement;

    expect(element).toBeTruthy();
  }));

  it('should have an invalid form state when form is empty', async(() => {
    expect(component.userForm.valid).toBe(false);
  }));

  it('should have a disabled loginButton when form is invalid', async(() => {
    fixture.detectChanges();

    expect(compiled.querySelector('button').disabled && !component.userForm.valid).toBe(true);
  }));

  it('should fail if email is not valid', async(() => {
    const email: AbstractControl = component.userForm.controls['email'];

    email.setValue('email');

    fixture.detectChanges();

    expect(email.errors['email']).toBe(true);
  }));

  it('should fail if password is not set', async(() => {
    const password: AbstractControl = component.userForm.controls['password'];

    expect(password.errors['required']).toBe(true);
  }));

  it('should fail if password is less than 6 characters', async(() => {
    const password: AbstractControl = component.userForm.controls['password'];

    password.setValue('12345');

    console.log(password.errors);

    expect(password.errors['minlength']).toBeTruthy();
  }));
});

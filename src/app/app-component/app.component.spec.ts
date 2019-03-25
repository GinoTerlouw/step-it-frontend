import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {DebugElement} from '@angular/core';
import {HeaderComponent} from '../components/header/header.component';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let element: DebugElement;
  let compiled;

  beforeAll(async(() => {

  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      imports: [
        RouterTestingModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  it('should create the app', async(() => {
    console.log('app called');

    fixture.detectChanges();

    element = fixture.debugElement.componentInstance;

    expect(element).toBeTruthy();
  }));

  it('should not have header element', async(() => {
    fixture.detectChanges();

    compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-header')).toBe(null);
  }));

  it('should have header element', async(() => {
    component.menuVisible = true;

    fixture.detectChanges();

    compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('app-header')).toBeTruthy();
  }));
});

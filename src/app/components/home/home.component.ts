import {Component, OnInit} from '@angular/core';
import RouteInterface from '../../interfaces/route.interface';
import {GeneralStateService} from '../../services/generalState/general-state.service';
import {JwtService} from '../../services/jwt/jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, RouteInterface {
  private readonly BACKGROUND_COLOR: Colors = 'orange';
  private readonly ACCENT_COLOR: Colors = 'purple';
  private readonly MENU_VISIBLE: boolean = false;

  user = this.jwtService.parseJWT();
  oldAcceleration: DeviceAcceleration = {x: 0, y: 0, z: 0};
  isChange: number = null;
  stepCount: number = 0;
  acceptible: number = 0;
  name: string = this.user.name;
  requiredSteps: number = 100;
  requiredStepsToNextLevel: number = 10;
  stepsToGo: number = this.requiredSteps;
  stepsToNextLevel: number = this.requiredStepsToNextLevel;
  level: number = 1;


  constructor(
    private generalStateService: GeneralStateService,
    private jwtService: JwtService
  ) {
    // @ts-ignore
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', this.deviceMotionHandler.bind(this), false);
    } else {
      console.log('This device does not support Device Motion');
    }

  }

  deviceMotionHandler(eventData) {
    // Grab the acceleration including gravity from the results
    const acceleration = eventData.accelerationIncludingGravity;

    // Grab the rotation rate from the results
    const rotation = eventData.rotationRate;

    let dot = (this.oldAcceleration.x * acceleration.x) +
      (this.oldAcceleration.y * acceleration.y) +
      (this.oldAcceleration.z * acceleration.z);
    const a = Math.abs(Math.sqrt(Math.pow(this.oldAcceleration.x, 2) +
      Math.pow(this.oldAcceleration.y, 2) +
      Math.pow(this.oldAcceleration.z, 2)));
    const b = Math.abs(Math.sqrt(Math.pow(acceleration.x, 2) +
      Math.pow(acceleration.y, 2) +
      Math.pow(acceleration.z, 2)));
    dot /= (a * b);
    if (dot <= 0.994 && dot > 0.93 && acceleration.x < 0.5) {
      if (this.isChange === 0) {
        if (this.acceptible > 2) {
          this.stepCount += 1;
          this.acceptible = 0;
        } else {
          this.acceptible++;
        }
      } else {
        if (this.isChange === 3) {
          this.isChange = -1;
        }
      }
      this.isChange += 1;
    }
    // set old acceleration to current
    this.oldAcceleration = acceleration;
  }

  ngOnInit() {
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

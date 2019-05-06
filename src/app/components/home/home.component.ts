import {Component, OnInit} from '@angular/core';
import RouteInterface from '../../interfaces/route.interface';
import {GeneralStateService} from '../../services/generalState/general-state.service';
import {JwtService} from '../../services/jwt/jwt.service';
import {MatDialog, MatDialogRef} from '@angular/material';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, RouteInterface {
  private readonly BACKGROUND_COLOR: Colors = 'purple';
  private readonly ACCENT_COLOR: Colors = 'orange';
  private readonly MENU_VISIBLE: boolean = true;

  user = this.jwtService.parseJWT();
  oldAcceleration: DeviceAcceleration = {x: 0, y: 0, z: 0};
  isChange: number = null;
  stepCount: number;
  acceptable: number = 0;
  name: string = this.user.name;
  requiredSteps: number = 100;
  stepsToNextLevel: number = 10;
  stepsToGo: number = this.requiredSteps;
  level: number = 1;
  localStorageTest: string = '__storage_test__';

  constructor(
    private generalStateService: GeneralStateService,
    private jwtService: JwtService,
    public dialog: MatDialog
  ) {
    // @ts-ignore
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', this.deviceMotionHandler.bind(this), false);
    } else {
      console.log('This device does not support Device Motion');
    }
    this.setAccentColor();
    this.setBackGroundColor();
    this.setMenuVisibility();
    if (this.storageAvailable()) {
      this.stepCount = Number(localStorage.getItem('stepcount'));
      this.level = Number(localStorage.getItem('level'));
      this.stepsToNextLevel = Number(localStorage.getItem('stepsToNextLevel'));
    }
  }

  deviceMotionHandler(eventData) {
    // Grab the acceleration including gravity from the results
    const acceleration = eventData.accelerationIncludingGravity;

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
        if (this.acceptable > 2) {
          this.stepCount += 1;
          if (this.storageAvailable()) {
            localStorage.setItem('stepCount', JSON.stringify(this.stepCount));
          }
          this.acceptable = 0;
          this.stepsToNextLevel--;
          if (this.stepsToNextLevel <= 0) {
            this.levelUp();
          }
          this.stepsToGo = this.requiredSteps - this.stepCount;
          if (this.stepsToGo <= 0) {
            this.requiredSteps *= 2;
            this.stepsToGo = this.requiredSteps;
          }
        } else {
          this.acceptable++;
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
    if (this.storageAvailable()) {
      this.stepCount = Number(localStorage.getItem('stepCount'));
      this.stepsToGo = this.requiredSteps - this.stepCount;
    }
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
  storageAvailable() {
    try {
      localStorage.setItem('test', this.localStorageTest);
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }
  displayReward() {
    const reward = this.dialog.open(RewardDialogComponent);
    const audio = new Audio();
    audio.src = 'assets/sound/succes1.wav';
    audio.load();
    audio.play();
  }
  levelUp() {
    this.level++;
    this.stepsToNextLevel = Math.pow(this.level, 2) + Math.floor(Math.sqrt(10 * Math.sqrt(this.level)));
    if (this.storageAvailable()) {
      localStorage.setItem('level', JSON.stringify(this.level));
      localStorage.setItem('stepsToNextLevel', JSON.stringify(this.stepsToNextLevel));
    }
    // this.displayReward();
  }
  // DEBUG FUCTIONS
  reset() {
    this.level = 1;
    this.stepCount = 0;
    this.stepsToNextLevel = Math.pow(this.level, 2) + Math.floor(Math.sqrt(10 * Math.sqrt(this.level)));
    if (this.storageAvailable()) {
      localStorage.setItem('level', '1');
      localStorage.setItem('stepCount', '0');
      localStorage.setItem('stepsToNextLevel', '11');
    }
  }
  levelup() {
    this.levelUp();
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}
@Component({
  templateUrl: './reward-dialog.html'
})
export class RewardDialogComponent {
  constructor(
    public reward: MatDialogRef<RewardDialogComponent>
  ) {}
  closeDialog() {
    this.reward.close();
  }
}

import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-ng-circle-progress',
  templateUrl: './ng-circle-progress.component.html',
  styleUrls: ['./ng-circle-progress.component.css'],
})

export class NgCircleProgressComponent implements OnInit {
  stepsToNextLevel: number;
  constructor(private _homeComponent: HomeComponent) { }

  ngOnInit() {
    this.stepsToNextLevel = this._homeComponent.getStepsToNextLevel() / 100 * this._homeComponent.getStepCount();
  }

}

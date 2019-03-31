import {Component, OnDestroy, OnInit} from '@angular/core';
import {GeneralStateService} from '../services/generalState/general-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  menuVisible: boolean = this.generalStateService.getMenuVisibility();
  backGroundColor: Colors = this.generalStateService.getBackgroundColor();
  backGroundColorSubscriber = this.generalStateService.getBackgroundColorEvent();
  menuVisibilitySubscriber = this.generalStateService.getMenuVisibilityEvent();

  constructor(private generalStateService: GeneralStateService) {
  }

  ngOnInit(): void {
    this.backGroundColorSubscriber.subscribe((color: Colors) => {
      this.backGroundColor = color;
    });

    this.menuVisibilitySubscriber.subscribe((val: boolean) => {
      this.menuVisible = val;
    });
  }

  ngOnDestroy(): void {
    this.backGroundColorSubscriber.unsubscribe();
    this.menuVisibilitySubscriber.unsubscribe();
  }
}

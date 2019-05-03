import {Component, OnDestroy, OnInit} from '@angular/core';
import {GeneralStateService} from '../services/generalState/general-state.service';
import {ToastrService} from 'ngx-toastr';
import {ConnectivityCheckService} from '../services/connectivityCheck/connectivity-check.service';
import Swipe from '../../helpers/swipe.helper';

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

  constructor(
    private generalStateService: GeneralStateService,
    private toastr: ToastrService,
    private connectivityChecker: ConnectivityCheckService
  ) {
  }

  ngOnInit(): void {
    this.connectivityChecker.monitor().subscribe((online) => {
      if (online) {
        this.toastr.info('internet is terug');
      } else {
        this.toastr.info('internet is weggevallen');
      }
    });

    this.backGroundColorSubscriber.subscribe((color: Colors) => {
      this.backGroundColor = color;
    });

    this.menuVisibilitySubscriber.subscribe((val: boolean) => {
      this.menuVisible = val;
    });

    const swiper = new Swipe(document.getElementById('swipeArea'));

    swiper.onRight(() => {
      this.generalStateService.toggleMenu(true);
    });

    swiper.onLeft(() => {
      this.generalStateService.toggleMenu(false);
    });

    swiper.run();
  }

  ngOnDestroy(): void {
    this.backGroundColorSubscriber.unsubscribe();
    this.menuVisibilitySubscriber.unsubscribe();
  }
}

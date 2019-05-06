import {Component, OnDestroy, OnInit} from '@angular/core';
import {GeneralStateService} from '../../services/generalState/general-state.service';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})
export class HamburgerMenuComponent implements OnInit, OnDestroy {
  public menuColor: string = this.generalStateService.getAccentColor();
  private menuColorSubscriber = this.generalStateService.getAccentColorEvent();

  constructor(private generalStateService: GeneralStateService) {
  }

  toggleState() {
    document.getElementById('hamburger').classList.toggle('bt-menu-open');
    this.generalStateService.toggleMenu();
  }

  ngOnInit(): void {
    this.menuColorSubscriber.subscribe((color) => {
      this.menuColor = color;
    });
  }

  ngOnDestroy(): void {
    this.menuColorSubscriber.unsubscribe();
  }
}

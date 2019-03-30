import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuStateService} from '../../services/menuState/menu-state.service';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})
export class HamburgerMenuComponent implements OnInit, OnDestroy {
  public menuColor: string = this.menuStateService.getMenuColor();
  private menuColorSubscriber = this.menuStateService.getMenuColorEvent();

  constructor(private menuStateService: MenuStateService) {
  }

  toggleState() {
    document.getElementById('hamburger').classList.toggle('bt-menu-open');
    this.menuStateService.toggleMenu();
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

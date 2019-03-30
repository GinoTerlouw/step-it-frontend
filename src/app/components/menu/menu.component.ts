import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuStateService} from '../../services/menuState/menu-state.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  private menuSubscriber = this.menuStateService.getToggleMenuEvent();
  private menuColorSubscriber = this.menuStateService.getMenuColorEvent();
  public isOpen: boolean = false;
  public menuColor: Colors = this.menuStateService.getMenuColor();

  constructor(private menuStateService: MenuStateService) {
  }

  ngOnInit(): void {
    this.menuSubscriber.subscribe(() => {
      this.isOpen = !this.isOpen;
    });

    this.menuColorSubscriber.subscribe((color) => {
      this.menuColor = color;
    });
  }

  ngOnDestroy(): void {
    this.menuSubscriber.unsubscribe();
    this.menuColorSubscriber.unsubscribe();
  }
}

import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {
  private toggleMenuEvent: EventEmitter<boolean> = new EventEmitter();
  public menuColorEvent: EventEmitter<Colors> = new EventEmitter();
  private menuIsOpen: boolean = false;
  private menuColor: Colors = 'orange';

  private emitToggleMenuEvent(val) {
    this.toggleMenuEvent.emit(val);
  }

  public getToggleMenuEvent(): EventEmitter<boolean> {
    return this.toggleMenuEvent;
  }

  public toggleMenu() {
    this.menuIsOpen = !this.menuIsOpen;
    this.emitToggleMenuEvent(this.menuIsOpen);
  }

  public getMenuColor(): Colors {
    return this.menuColor;
  }

  public getMenuColorEvent(): EventEmitter<Colors> {
    return this.menuColorEvent;
  }

  public emitColorChangeEvent(color: Colors) {
    this.menuColor = color;
    this.menuColorEvent.emit(color);
  }
}

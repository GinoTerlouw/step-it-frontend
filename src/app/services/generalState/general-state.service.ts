import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralStateService {
  private toggleMenuEvent: EventEmitter<boolean> = new EventEmitter();
  private accentColorEvent: EventEmitter<Colors> = new EventEmitter();
  private menuVisibilityEvent: EventEmitter<boolean> = new EventEmitter();
  private backgroundColorEvent: EventEmitter<Colors> = new EventEmitter();
  private menuIsOpen: boolean = false;
  private accentColor: Colors = 'orange';
  private _isMenuVisible: boolean = true;
  private backgroundColor: Colors = 'purple';

  private emitToggleMenuEvent(val): void {
    this.toggleMenuEvent.emit(val);
  }

  public getToggleMenuEvent(): EventEmitter<boolean> {
    return this.toggleMenuEvent;
  }

  public toggleMenu(val: boolean = null): void {
    this.menuIsOpen = val ? val : !this.menuIsOpen;
    this.emitToggleMenuEvent(this.menuIsOpen);
  }

  public getBackgroundColor(): Colors {
    return this.backgroundColor;
  }

  public getBackgroundColorEvent(): EventEmitter<Colors> {
    return this.backgroundColorEvent;
  }

  public emitBackgroundColorChangeEvent(color: Colors): void {
    this.backgroundColor = color;
    this.backgroundColorEvent.emit(color);
  }

  public getAccentColor(): Colors {
    return this.accentColor;
  }

  public getAccentColorEvent(): EventEmitter<Colors> {
    return this.accentColorEvent;
  }

  public emitAccentColorChangeEvent(color: Colors): void {
    this.accentColor = color;
    this.accentColorEvent.emit(color);
  }

  public getMenuVisibility(): boolean {
    return this._isMenuVisible;
  }

  public getMenuVisibilityEvent(): EventEmitter<boolean> {
    return this.menuVisibilityEvent;
  }

  public emitMenuVisibilityEvent(val: boolean) {
    this._isMenuVisible = val;
    this.menuVisibilityEvent.emit(val);
  }
}

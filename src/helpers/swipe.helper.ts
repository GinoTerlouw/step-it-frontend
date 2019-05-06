class Swipe {
  private xDown: number;
  private yDown: number;
  private xDiff: number;
  private yDiff: number;
  private element: HTMLElement;
  private _onLeft: Function;
  private _onRight: Function;
  private _onUp: Function;
  private _onDown: Function;

  constructor(element: HTMLElement) {
    this.element = element;

    this.element.addEventListener('touchstart', (event) => {
      this.xDown = event.touches[0].clientX;
      this.yDown = event.touches[0].clientY;
    });
  }


  onLeft(callback) {
    this._onLeft = callback;

    return this;
  }

  onRight(callback) {
    this._onRight = callback;

    return this;
  }

  onUp(callback) {
    this._onUp = callback;

    return this;
  }

  onDown(callback) {
    this._onDown = callback;

    return this;
  }

  handleTouchMove(evt) {
    if (!this.xDown || !this.yDown) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    this.xDiff = this.xDown - xUp;
    this.yDiff = this.yDown - yUp;

    if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) { // Most significant.
      if (this.xDiff > 0) {
        this._onLeft();
      } else {
        this._onRight();
      }
    } else {
      if (this.yDiff > 0) {
        this._onUp();
      } else {
        this._onDown();
      }
    }

    // Reset values.
    this.xDown = null;
    this.yDown = null;
  }

  run() {
    this.element.addEventListener('touchmove', function (evt) {
      this.handleTouchMove(evt).bind(this);
    }.bind(this), false);
  }
}

export default Swipe;

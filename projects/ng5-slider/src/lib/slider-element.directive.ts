  // tslint:disable: variable-name
import { Directive, ElementRef, Renderer2, HostBinding } from '@angular/core';
import { EventListenerHelper } from './event-listener-helper';
import { EventListener } from './event-listener';
import { ValueHelper } from './value-helper';

@Directive({
  selector: '[ng5SliderElement]'
})
export class SliderElementDirective {
  private _position = 0;
  get position(): number {
    return this._position;
  }

  private _dimension = 0;
  get dimension(): number {
    return this._dimension;
  }

  private _alwaysHide = false;
  get alwaysHide(): boolean {
    return this._alwaysHide;
  }

  private _vertical = false;
  get vertical(): boolean {
    return this._vertical;
  }

  private _scale = 1;
  get scale(): number {
    return this._scale;
  }

  @HostBinding('style.opacity')
  opacity = 1;

  @HostBinding('style.visibility')
  visibility = 'visible';

  @HostBinding('style.left')
  left = '';

  @HostBinding('style.bottom')
  bottom = '';

  @HostBinding('style.height')
  height = '';

  @HostBinding('style.width')
  width = '';

  private eventListenerHelper: EventListenerHelper;
  private eventListeners: EventListener[] = [];

  constructor(protected elemRef: ElementRef, protected renderer: Renderer2) {
    this.eventListenerHelper = new EventListenerHelper(this.renderer);
  }

  setAlwaysHide(hide: boolean): void {
    this._alwaysHide = hide;
    if (hide) {
      this.visibility = 'hidden';
    } else {
      this.visibility = 'visible';
    }
  }

  hide(): void {
    this.opacity = 0;
  }

  show(): void {
    if (this.alwaysHide) {
      return;
    }

    this.opacity = 1;
  }

  isVisible(): boolean {
    if (this.alwaysHide) {
      return false;
    }
    return this.opacity !== 0;
  }

  setVertical(vertical: boolean): void {
    this._vertical = vertical;
    if (this._vertical) {
      this.left = '';
      this.width = '';
    } else {
      this.bottom = '';
      this.height = '';
    }
  }

  setScale(scale: number): void {
    this._scale = scale;
  }

   // Set element left/top position depending on whether slider is horizontal or vertical
  setPosition(pos: number): void {
    this._position = pos;
    if (this._vertical) {
      this.bottom = Math.round(pos) + 'px';
    } else {
      this.left = Math.round(pos) + 'px';
    }
  }

  // Calculate element's width/height depending on whether slider is horizontal or vertical
  calculateDimension(): void {
    const val: ClientRect = this.getBoundingClientRect();
    if (this.vertical) {
      this._dimension = (val.bottom - val.top) * this.scale;
    } else {
      this._dimension = (val.right - val.left) * this.scale;
    }
  }

  // Set element width/height depending on whether slider is horizontal or vertical
  setDimension(dim: number): void {
    this._dimension = dim;
    if (this._vertical) {
      this.height = Math.round(dim) + 'px';
    } else {
      this.width = Math.round(dim) + 'px';
    }
  }

  getBoundingClientRect(): ClientRect {
    return this.elemRef.nativeElement.getBoundingClientRect();
  }

  on(eventName: string, callback: (event: any) => void, debounceInterval?: number): void {
    const listener: EventListener = this.eventListenerHelper.attachEventListener(
      this.elemRef.nativeElement, eventName, callback, debounceInterval);
    this.eventListeners.push(listener);
  }

  onPassive(eventName: string, callback: (event: any) => void, debounceInterval?: number): void {
    const listener: EventListener = this.eventListenerHelper.attachPassiveEventListener(
      this.elemRef.nativeElement, eventName, callback, debounceInterval);
    this.eventListeners.push(listener);
  }

  off(eventName?: string): void {
    let listenersToKeep: EventListener[];
    let listenersToRemove: EventListener[];
    if (!ValueHelper.isNullOrUndefined(eventName)) {
      listenersToKeep = this.eventListeners.filter((event: EventListener) => event.eventName !== eventName);
      listenersToRemove = this.eventListeners.filter((event: EventListener) => event.eventName === eventName);
    } else {
      listenersToKeep = [];
      listenersToRemove = this.eventListeners;
    }

    for (const listener of listenersToRemove) {
      this.eventListenerHelper.detachEventListener(listener);
    }

    this.eventListeners = listenersToKeep;
  }
}

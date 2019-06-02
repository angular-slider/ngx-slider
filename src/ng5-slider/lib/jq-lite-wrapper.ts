import { ElementRef, Renderer2 } from '@angular/core';

import { EventListener } from './event-listener';
import { EventListenerHelper } from './event-listener-helper';

/**
 * Wrapper to support legacy jqLite interface
 *
 * The aim is to slowly phase out the usage of this wrapper and replace
 * any manual DOM manipulations with Angular bindings
 */
export class JqLiteWrapper {
  private eventListenerHelper: EventListenerHelper;
  private eventListeners: EventListener[] = [];

  constructor(private elemRef: ElementRef, private renderer: Renderer2) {
    this.eventListenerHelper = new EventListenerHelper(this.renderer);
  }

  addClass(clazz: string): void {
    this.renderer.addClass(this.elemRef.nativeElement, clazz);
  }

  removeClass(clazz: string): void {
    this.renderer.removeClass(this.elemRef.nativeElement, clazz);
  }

  hasClass(clazz: string): boolean {
    return this.elemRef.nativeElement.classList.contains(clazz);
  }

  html(html: string): void {
    this.elemRef.nativeElement.innerHTML = html;
  }

  css(style: string, value: string): void {
    if (value !== '') {
      this.renderer.setStyle(this.elemRef.nativeElement, style, value);
    } else {
      this.renderer.removeStyle(this.elemRef.nativeElement, style);
    }
  }

  attr(attr: string, value: string): void {
    if (value !== null) {
      this.renderer.setAttribute(this.elemRef.nativeElement, attr, value);
    } else {
      this.renderer.removeAttribute(this.elemRef.nativeElement, attr);
    }
  }

  getBoundingClientRect(): ClientRect {
    return this.elemRef.nativeElement.getBoundingClientRect();
  }

  focus(): void {
    this.elemRef.nativeElement.focus();
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
    if (eventName) {
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

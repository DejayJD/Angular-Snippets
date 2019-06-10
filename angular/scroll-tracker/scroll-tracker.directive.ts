import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[scrollTracker]'
})
export class ScrollTrackerDirective {
  @Output() scrollChange = new EventEmitter<any>();

  constructor() {
  }

  @HostListener('scroll', ['$event'])
  private onScroll($event: Event): void {
    if ($event.srcElement) {
      let maxHScroll = $event.srcElement.scrollWidth - $event.srcElement.clientWidth;
      let maxVScroll = $event.srcElement.scrollHeight - $event.srcElement.clientHeight;
      this.scrollChange.emit(
        {
          hScroll: {val: $event.srcElement.scrollLeft, max: maxHScroll},
          vScroll: {val: $event.srcElement.scrollTop, max: maxVScroll}
        });
    }
  }
}

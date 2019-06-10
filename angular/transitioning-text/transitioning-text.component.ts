import {Component, Input, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-transitioning-text',
  templateUrl: './transitioning-text.component.html',
  styleUrls: ['./transitioning-text.component.css'],
  animations: [trigger('fade', [
    transition('* => fade', [
      style({
        opacity: '0'
      }),
      animate('2000ms ease-in')]),
  ])]
})
export class TransitioningTextComponent implements OnInit {
  //TODO: Implement a fade speed method
  @Input() states;
  @Input() startImmediately = false;

  currentState = 0;
  textFading = false;
  transitionStarted = false;
  fading = false;


  constructor() {
  }

  transitionToNextState() {
    this.currentState += 1;
    this.textFading = false;
    if (this.currentState == this.states.length) {
      this.currentState = 0;
      this.transitionStarted = false;
      return;
    }
    if (this.states[this.currentState].fade != null) {
      this.fadeText(this.states[this.currentState]);
    }
  }

  startTransition() {
    this.transitionStarted = true;
  }


  //TODO: finish doing this with angular animations to get dynamic animation speeds instead
  getStateAnimation(state) {
    if (state.fade != null && this.textFading) {
      return {
        value: 'fade',
        data: [
          style({
            opacity: '0'
          }),
          animate(`${state.fade.fadeSpeed}ms ease-in`)
        ]
      }
    }
    else {
      return '';
    }
  }

  resetState() {
    this.currentState = 0;
    this.textFading = false;
    this.transitionStarted = true;
  }

  fadeText(state) {
    setTimeout(() => {
      this.textFading = true
    }, state.fade.fadeAfter);
    setTimeout(() => {
      this.transitionToNextState()
    }, state.fade.fadeAfter + 2000);
  }

  ngOnInit() {
    this.transitionStarted = this.startImmediately;
  }
}

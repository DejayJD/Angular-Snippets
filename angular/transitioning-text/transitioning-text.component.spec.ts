import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitioningTextComponent } from './transitioning-text.component';

describe('TransitioningTextComponent', () => {
  let component: TransitioningTextComponent;
  let fixture: ComponentFixture<TransitioningTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitioningTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitioningTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedDotListComponent } from './connected-dot-list.component';

describe('ConnectedDotListComponent', () => {
  let component: ConnectedDotListComponent;
  let fixture: ComponentFixture<ConnectedDotListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectedDotListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedDotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

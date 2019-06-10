import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputTemplateComponent } from './form-input-template.component';

describe('FormInputTemplateComponent', () => {
  let component: FormInputTemplateComponent;
  let fixture: ComponentFixture<FormInputTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInputTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

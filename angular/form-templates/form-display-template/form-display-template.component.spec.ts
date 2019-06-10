import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormDisplayTemplateComponent} from './form-display-template.component';

describe('FormDisplayTemplateComponent', () => {
    let component: FormDisplayTemplateComponent;
    let fixture: ComponentFixture<FormDisplayTemplateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormDisplayTemplateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormDisplayTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormEditTemplateComponent} from './form-edit-template.component';

describe('FormEditTemplateComponent', () => {
    let component: FormEditTemplateComponent;
    let fixture: ComponentFixture<FormEditTemplateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormEditTemplateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormEditTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

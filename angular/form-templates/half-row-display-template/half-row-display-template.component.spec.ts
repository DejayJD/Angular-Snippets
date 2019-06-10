import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HalfRowDisplayTemplateComponent} from './half-row-display-template.component';

describe('HalfRowDisplayTemplateComponent', () => {
    let component: HalfRowDisplayTemplateComponent;
    let fixture: ComponentFixture<HalfRowDisplayTemplateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HalfRowDisplayTemplateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HalfRowDisplayTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AutocompleteWrapperComponent} from './autocomplete-wrapper.component';

describe('AutocompleteWrapperComponent', () => {
    let component: AutocompleteWrapperComponent;
    let fixture: ComponentFixture<AutocompleteWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AutocompleteWrapperComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutocompleteWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

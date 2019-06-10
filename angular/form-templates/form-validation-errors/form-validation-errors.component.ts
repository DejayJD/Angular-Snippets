import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-form-validation-errors',
    templateUrl: './form-validation-errors.component.html',
    styleUrls: ['../form-edit-template/form-edit-template.component.scss', './form-validation-errors.component.css']
})
export class FormValidationErrorsComponent implements OnInit {
    @Input() editForm;
    @Input() formControlName;
    @Input() showErrors;
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    ngOnChanges() {
    }
    
    addSpaceBeforeCapitalLetters(string) {
        string = string.replace('Id', '');
        return string.replace(/([A-Z]+)/g, ' $1').trim();
    }
    
}

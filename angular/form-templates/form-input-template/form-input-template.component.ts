import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-form-input-template',
    templateUrl: './form-input-template.component.html',
    styleUrls: ['./form-input-template.component.css']
})
export class FormInputTemplateComponent implements OnInit {
    @Input() formControlName : string;
    @Input() isDisabled : boolean;
    @Input() values : any[];
    @Input() field : string;
    @Input() foreignKey: any;
    @Input() htmlInputType: string;
    @Input() formGroup : FormGroup;
    constructor() {
    
    }
    
    ngOnInit() {
    }
    
}

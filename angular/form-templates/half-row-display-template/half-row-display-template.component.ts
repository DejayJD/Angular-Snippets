import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'template-half-row-display',
    templateUrl: './half-row-display-template.component.html',
    styleUrls: ['./half-row-display-template.component.css']
})
export class HalfRowDisplayTemplateComponent implements OnInit {

    @Input() rowData;
    @Input() headers;

    constructor() {
    }

    ngOnInit() {
    }

}

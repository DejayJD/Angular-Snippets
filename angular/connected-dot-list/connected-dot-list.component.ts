import {Component, ContentChild, ElementRef, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-connected-dot-list',
    templateUrl: './connected-dot-list.component.html',
    styleUrls: ['./connected-dot-list.component.scss']
})
export class ConnectedDotListComponent implements OnInit {
    @Input() listData: any[];
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
}

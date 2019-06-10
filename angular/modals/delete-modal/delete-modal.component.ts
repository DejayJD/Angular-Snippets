import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['../modal.component.scss', './delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

    @Input() visible: boolean = false;
    @Output() onDelete: EventEmitter<any> = new EventEmitter(null);
    @Output() onClose: EventEmitter<any> = new EventEmitter(null);

    constructor() {
    }

    ngOnInit() {
    }

    submitDelete() {
        this.onDelete.emit();
    }

    closeModal() {
        this.onClose.emit();
    }

}

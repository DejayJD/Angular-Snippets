import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['../modal.component.scss']
})
//Example Input: (From FabricNodeGroup CRUD page)
//   this.editForm = this.fb.group({
//     GroupName: ['' [<any>Validators.required, <any>Validators.maxLength(50)]],
//     NodeEndPoint: ['' [<any>Validators.required, <any>Validators.maxLength(50)]],
//     Description: ['' [<any>Validators.required, <any>Validators.maxLength(500)]],
//     FabricName: ['' [<any>Validators.required]],
//     DatacenterName: ['' [<any>Validators.required]]
//   });
//   this.editableColumns = [
//     {label:"GroupName", htmlInputType:"text"},
//     {label:"NodeEndPoint", htmlInputType:"text"},
//     {label:"Description", htmlInputType:"textarea"},
//     {label:"FabricName", htmlInputType:"selectDropdown", values:[]},
//     {label:"DatacenterName", htmlInputType:"selectDropdown", values:[]}
//   ];

export class EditModalComponent implements OnInit {

    @Input() visible: boolean = false;
    @Input() editableColumns;
    @Input() editForm: FormGroup;
    @Input() dataValues;
    @Input() selectedInput;
    @Input() showErrors: boolean = false;

    @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>(null);
    @Output() onClose: EventEmitter<any> = new EventEmitter<any>(null);
    @Output() onOpen: EventEmitter<any> = new EventEmitter<any>(null);

    constructor() {
    }

    ngOnChanges() {
        if (this.visible) {
            this.onOpen.emit(this.selectedInput);
        }
    }

    ngOnInit() {
    }

    submit() {
        this.onSubmit.emit(this.editForm); //new form values
    }

    closeModal() {
        this.onClose.emit(null);
    }
}

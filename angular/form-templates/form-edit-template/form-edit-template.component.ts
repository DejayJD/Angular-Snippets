import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import * as _ from "lodash";
import {EditableColumnItem} from "../../../../shared/classes/EditableColumnItem";
import {FormComponentTreeService} from "../../../../shared/services/internal/form-component-tree.service";

@Component({
    selector: 'app-form-edit-template',
    templateUrl: './form-edit-template.component.html',
    styleUrls: ['./form-edit-template.component.scss']
})
export class FormEditTemplateComponent implements OnInit {
    @ViewChild('componentLoader') componentLoader;
    @Input() editForm: FormGroup;
    @Input() showErrors: boolean = false;
    @Input() editableColumns: EditableColumnItem[];
    @Input() tupleAutocompleteValues: boolean = false;
    
    @Output() subFormOutput: EventEmitter<any> = new EventEmitter();
    @Output() onSubFormAdd: EventEmitter<any> = new EventEmitter();
    @Output() onSubFormRemove: EventEmitter<any> = new EventEmitter();
    
    constructor(private formTreeService: FormComponentTreeService) {
    }
    
    getFormChildren() {
        let subForms = _.filter(this.editableColumns, (col) => {
            return col.subForm != null
        });
        return _.filter(subForms, (col) => {
            return col.subForm.formType == "child" && col.subForm.formAdded
        });
    }
    
    getFormChildrenComponents() {
        return _.map(_.map(this.getFormChildren(), 'subForm'), (subForm) => {
            return {component: subForm.component, dependencies: subForm.dependencies}
        });
    }
    
    addFormTreeChildren() {
        let children = this.getFormChildrenComponents();
        if (children != []) {
            this.formTreeService.stageNodes(this, children);
        }
    }
    
    ngOnInit() {
    }
    
    addSpaceBeforeCapitalLetters(string) {
        if (string == null) {
            return null;
        }
        string = string.replace('Id', '');
        return string.replace(/([A-Z]+)/g, ' $1').trim();
    }
    
    addFormUsingButton(col: EditableColumnItem) {
        this.addForm(col);
        this.onSubFormAdd.emit(col);
    }
    
    addForm(col: EditableColumnItem) {
        if (!col.subForm.formAdded) {
            col.subForm.formAdded = true;
            col.subForm.showCancelButton = true;
        }
    }
    
    hideForm(col: EditableColumnItem) {
        col.subForm.showCancelButton = false;
        col.subForm.formAdded = false;
        this.onSubFormRemove.emit(col.subForm.component);
    }
    
    removeChildForm(col: EditableColumnItem) {
        _.remove(this.editableColumns, (editCol) => {
            return editCol.formControlName == col.formControlName
        });
        this.formTreeService.removeComponent(col.subForm.component);
        this.hideForm(col);
    }
    
    showChildForm(col) {
        let column = null;
        if (typeof col === "string") {
            column = _.find(this.editableColumns, c => {
                return c.formControlName == col
            });
        }
        else if ('formControlName' in col) {
            column = _.find(this.editableColumns, c => {
                return c.formControlName == col.formControlName
            });
        }
        if (column != null) {
            column.subForm.formAdded = true;
            column.subForm.showCancelButton = true;
        }
    }
    
    addChildForm(col: EditableColumnItem) {
        if (_.find(this.editableColumns, c => {
                return c.formControlName == col.formControlName
            }) == null) {
            this.editableColumns.push(col);
        }
        this.addForm(col);
    }
    
    catchComponentInit(col, instance) {
        if (col.subForm.formType == "child") {
            this.formTreeService.setNodeInstance(instance);
        }
    }
    
    emitSubForm(col, event) {
        event['column'] = col;
        this.subFormOutput.emit(event);
        this.handleSubFormSubmission(event);
        this.hideForm(col);
    }
    
    handleSubFormSubmission(data) {
        //Make sure this isn't getting triggered by the wrong output
        if (data.outputType = "formSubmit" && data.column.subForm.formType != "child") {
            let formControlName = data.column.formControlName;
            this.addValueToDropdown(data.output[0], formControlName);
            this.editForm.controls[formControlName].setValue(data.output[0][formControlName]);
        }
    }
    
    addValueToDropdown(value, formControlName) {
        let findCol = _.find(this.editableColumns, (col) => {
            return col.formControlName == formControlName;
        });
        if (findCol != null) {
            findCol.values.push(value);
        }
    }
    
}

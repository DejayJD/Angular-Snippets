import {Component, Input} from '@angular/core';
import * as _ from "lodash";

@Component({
    selector: 'app-form-display-template',
    templateUrl: './form-display-template.component.html',
    styleUrls: ['./form-display-template.component.css']
})
export class FormDisplayTemplateComponent {
    @Input() editForm; //optional
    @Input() viewableColumns;
    @Input() displayData: any = null;
    
    constructor() {
    }
    
    ngOnChanges() {
        if (this.displayData == null) {
            this.displayData = this.editForm.value;
        }
    }
    
    getDisplayData(col) {
        if (!_.isNil(this.displayData)) {
            if (this.displayData[col.field] != null) {
                return this.displayData[col.field];
            }
            if (col.values != null) { //Check for foreign key data. If so, display the label not the id.
                let foreignKeyIdentifier = col.foreignKey != null ? col.foreignKey : col.formControlName;
                if (col.htmlInputType == "dropdown") {
                    let dataFound = _.find(col.values, (data) => {
                        return data['value'] == this.displayData[foreignKeyIdentifier];
                    });
                    if (dataFound) {
                        return dataFound['label'];
                    }
                }
                if (col.htmlInputType == "autocomplete") {
                    let dataFound = _.find(col.values, (data) => {
                        return data[foreignKeyIdentifier] == this.displayData[foreignKeyIdentifier];
                    });
                    if (dataFound) {
                        return dataFound[col.field];
                    }
                }
            }
            return this.displayData[col.formControlName];
        }
    }
    
    addSpaceBeforeCapitalLetters(string) {
        string = string.replace('Id', ''); //Parse out any Ids that are in there
        return string.replace(/([A-Z]+)/g, ' $1').trim();
    }
}

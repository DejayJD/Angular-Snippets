import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AutoComplete} from "primeng/primeng";
import * as _ from "lodash";
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-autocomplete-wrapper',
    templateUrl: './autocomplete-wrapper.component.html',
    styleUrls: ['./autocomplete-wrapper.component.css']
})
export class AutocompleteWrapperComponent implements OnInit {
    @Input() suggestions;
    @Input() formControlName;
    @Input() foreignKey;
    @Input() editForm: FormGroup;
    @Input() field;
    @Input() formValueKey;
  @Input() tupleValues : boolean = false;

    @Output() onSelect: EventEmitter<any> = new EventEmitter(null);

    selectedValue;
    filteredSuggestions: any[];

    @ViewChild(AutoComplete) autoComplete;

    constructor(private cdr: ChangeDetectorRef) {
    }

    transformIdToAutocompleteObject() {
        let formIdValue = this.editForm.get(this.formControlName);
        let autocompleteObject = null;
        if (formIdValue.value != null) {
            autocompleteObject = _.find(this.suggestions, (val) => {
                return val[this.foreignKey != null ? this.foreignKey : this.formControlName] == formIdValue.value;
            });
        }
        return autocompleteObject != undefined ? autocompleteObject : this.selectedValue;
    }

    checkClear() {
    }

    checkUnselect() {
    }

    ngOnChanges(change) {
        this.selectedValue = this.transformIdToAutocompleteObject();
    }

    ngOnInit() {
        this.selectedValue = this.transformIdToAutocompleteObject();
        this.editForm.controls[this.formControlName].valueChanges.subscribe((newForm) => {
            this.selectedValue = this.transformIdToAutocompleteObject();
        });
    }

    handleDropdownClick(event) {
        //restore dropdown suggestions to everything if the arrow is clicked
        this.filteredSuggestions = this.suggestions;
        event.originalEvent.preventDefault();
        event.originalEvent.stopPropagation();
        this.autoComplete.show();
    }

    ngOnDestroy() {
        // this.cdr.detach();
    }

    filterAutocomplete(query) {
        let values = this.suggestions;
        if (query) {
            this.filteredSuggestions = _.filter(values, (val) => { //Filter the values by the query
                return _.some(_.values(val), (value) => {
                    if (value) {
                        //Lowercase them both and see if query exists as substring in one of the values
                        return value.toString().toLowerCase().includes(query.toString().toLowerCase());
                    }
                });
            });
        }
        else {
            this.filteredSuggestions = values;
        }
    }

  getIdFromSelectedValue(event) {
    let formKey = this.foreignKey != null ? this.foreignKey : this.formValueKey;
    this.editForm.markAsDirty();
    let formVal = event[formKey];this.editForm.get(this.formControlName).setValue(formVal);
    this.onSelect.emit(event[formKey]);
  }

}

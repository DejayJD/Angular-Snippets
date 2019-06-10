import {Component, Input, OnInit} from '@angular/core';
import {EditableColumnItem} from "../../../shared/classes/EditableColumnItem";
import * as _ from "lodash";

@Component({
    selector: 'audit-log',
    templateUrl: './audit-log.component.html',
    styleUrls: ['./audit-log.component.css']
})
export class AuditLogComponent implements OnInit {
    
    @Input() auditLog: any[];
    
    columns: EditableColumnItem[];
    
    
    constructor() {
    }
    
    ngOnInit() {
        
        this.columns = [
            {formControlName: "EntityName", displayHeader: 'Name', htmlInputType: "text", styles: {width: "10%"}},
            {
                formControlName: "PreviousValue",
                displayHeader: 'Previous Value',
                htmlInputType: "text",
                styles: {
                    width: "30%"
                }
            },
            {formControlName: "NewValue", displayHeader: 'New Value', htmlInputType: "text", styles: {width: "30%"}},
            {formControlName: "EntryDate", displayHeader: 'Date', htmlInputType: "text", styles: {width: "10%"}},
            {formControlName: "Creator", displayHeader: 'User', htmlInputType: "text", styles: {width: "10%"}}
        
        ];
    }
    
    isArray(v) {
        return Array.isArray(v);
    }
    
    ngOnChanges() {
        if (this.auditLog && this.auditLog.length > 0 && !this.auditLog['parsed']) {
            this.auditLog = _.map(this.auditLog, (auditLog) => {
                auditLog.NewValue = this.parseAuditLog(auditLog.NewValue, auditLog.EntityAttribute);
                auditLog.PreviousValue = this.parseAuditLog(auditLog.PreviousValue, auditLog.EntityAttribute);
                return auditLog;
            });
            this.auditLog.forEach(function (item) {
                let date = new Date(item.EntryDate).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                });
                let time = new Date(item.EntryDate).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
                item.EntryDate = date + ' ' + time;
            });
            this.auditLog['parsed'] = true;
        }
    }
    
    parseAuditLog(auditLogEntry, entityAttribute) {
        if (auditLogEntry != null && auditLogEntry != "none") {
            try {
                auditLogEntry = JSON.parse(auditLogEntry);
            }
            catch (e) {
            }
            //Edit audit history is one line per edit, parsing it to fit with the {'label','val'} object format
            if (entityAttribute != "Create" && entityAttribute != "Delete" && entityAttribute.match(/Clone/) == null) {
                let val = auditLogEntry;
                if (!Array.isArray(val)) {
                    if (val['label'] != null) {
                        if (typeof val['label'] == 'object') {
                            val['label'] = JSON.stringify(val['label']);
                        }
                    }
                    auditLogEntry = {};
                    auditLogEntry[entityAttribute] = val;
                }
            }
            //For non-edits which have more than one line
            auditLogEntry = _.map(auditLogEntry, (v, key) => {
                if (v != null) {
                    if (!v['parsed']) {
                        let newobj = null;
                        let k = key.toString();
                        if (v['label'] != null) { //For objects submitted with label/value pairs. (Ex. AssetStatusId: {label:Installed, val:2})
                            k = k.replace(/id/i, '');
                            v = v['label'];
                        }
                        if (k.match(/(id)|(child)/i) == null || k == entityAttribute) { //Dont show id values
                            newobj = {};
                            newobj['key'] = k;
                            newobj['val'] = v == null ? "No value" : v;
                            newobj['parsed'] = true;
                        }
                        return newobj;
                    }
                }
                return v;
            });
            auditLogEntry = _.filter(auditLogEntry, (entry) => {
                return !_.isNull(entry);
            });
        }
        return auditLogEntry;
    }
    
    ngOnDestroy() {
        this.auditLog = null;
    }
    
}

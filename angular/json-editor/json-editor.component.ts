import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {JSONIterablePipe} from "./json.pipe";
import * as _ from "lodash";
import {ContextMenu} from "primeng/primeng";

@Component({
    selector: 'app-json-editor',
    templateUrl: './json-editor.component.html',
    styleUrls: ['./json-editor.component.scss']
})
export class JsonEditorComponent implements OnInit {
    @ViewChild(ContextMenu) contextMenu;
    @Input() hiddenKeys: any;
    @Input() editable: boolean;
    @Input() scope: string;
    
    /*
        specialContextMenuButtons allows you to create specific buttons for specific types
        Format Example: {
        key:"Service Accounts, <= could also use a value instead
        icon:"fa-plus",
        label:"Create a new Service Account"
     */
    @Input() specialContextMenuButtons: any;
    @Output() specialContextMenuButtonAction: any = new EventEmitter();
    
    @Output() valueChange = new EventEmitter();
    @Output() createAttribute = new EventEmitter();
    
    jsonValueNode = {key: "", value: "", edit: true};
    objectValueNode = {edit: true, children: [{edit: true, key: "", value: ""}]};
    arrayNode = {value: "", edit: true};
    
    data: any;
    contextMenuItems: any;
    
    @Input()
    get jsonData() {
        return this.data;
    }
    
    set jsonData(val) {
        this.data = val;
        this.valueChange.emit(this.data);
    }
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    hiddenKeyIncludes(val) {
        return this.hiddenKeys.includes(val);
    }
    
    ngOnChanges(change) {
    }
    
    transformToObjectOrArray(node, isObject) {
        if (node.key == null) {
            node.key = node.value;
        }
        node.array = !isObject;
        //Initialize the children array if not already created
        if (node.children == null) {
            node.children = [];
        }
        let newNode = _.cloneDeep(isObject ? this.jsonValueNode : this.arrayNode);
        newNode.value = node.value;
        node.value = null;
        node.children.push(newNode);
    }
    
    removeNode(node) {
        node.delete = true;
        this.removeDeletedNodes(this.jsonData);
    }
    
    removeDeletedNodes(jsonData) {
        for (let node of jsonData) {
            if (node.children) {
                _.remove(node.children, (node) => {
                    return node['delete']
                });
                this.removeDeletedNodes(node.children);
            }
        }
    }
    
    convertToKeyPair(node) {
        node.children = null;
        node.edit = true;
        node.value = "";
    }
    
    createObjectNode(node) {
        let newVal = _.cloneDeep(this.objectValueNode);
        node.children.push(newVal);
    }
    
    addToNode(node, basic) {
        let newVal = basic ? _.cloneDeep(this.arrayNode) : _.cloneDeep(this.jsonValueNode);
        node.children.push(newVal);
    }
    
    seeValueChange(node) {
        // if (node.edit != null) {
        //   node.edit = false;
        // }
    }
    
    clearChildren(node) {
        node.children = [];
    }
    
    bindItemToContextMenu(item) {
        this.contextMenuItems = [];
        
        
        let specialContextItem = _.find(this.specialContextMenuButtons, (button) => {
            return (button.key != null && button.key == item.key) ||
                   (button.value != null && button.value == item.value);
        });
        if (specialContextItem != null) {
            this.contextMenuItems = this.contextMenuItems.concat([
                {
                    label: specialContextItem.label, icon: specialContextItem.icon, command: (event) => {
                    this.specialContextMenuButtonAction.emit({item: item, button:specialContextItem});
                }
                }
            ]);
        }
        //Item has children, therefore is an object or array
        if (item.children != null) {
            this.contextMenuItems = this.contextMenuItems.concat([
                {
                    label: 'Transform to key-pair', icon: "fa-th-list", command: (event) => {
                    this.convertToKeyPair(item)
                }
                }
            ]);
            this.contextMenuItems = this.contextMenuItems.concat([
                {
                    label: 'Add key-pair value', icon: "fa-plus", command: (event) => {
                    this.addToNode(item, false)
                }
                }
            ]);
            if (item.array) {
                this.contextMenuItems = this.contextMenuItems.concat([
                    {
                        label: 'Add basic value', icon: "fa-plus", command: (event) => {
                        this.addToNode(item, true)
                    }
                    },
                ]);
                this.contextMenuItems = this.contextMenuItems.concat([
                    {
                        label: 'Add object', icon: "fa-plus", command: (event) => {
                        this.createObjectNode(item)
                    }
                    },
                ]);
            }
            this.contextMenuItems = this.contextMenuItems.concat([
                {
                    label: 'Clear values', icon: "fa-minus", command: (event) => {
                    this.clearChildren(item)
                }
                },
            ]);
        }
        //Item does not have children, therefore is a single value or a key-pair value
        else {
            this.contextMenuItems = this.contextMenuItems.concat([
                {
                    label: 'Transform to object', icon: 'fa-th-list', command: (event) => {
                    this.transformToObjectOrArray(item, true)
                }
                },
                {
                    label: 'Transform to array', icon: 'fa-bars', command: (event) => {
                    this.transformToObjectOrArray(item, false)
                }
                },
            ]);
        }
        let arrayToggle = item.array ? " Array " : " Object ";
        //Always give a delete option
        this.contextMenuItems = this.contextMenuItems.concat([
            {
                label: 'Delete', icon: 'fa-trash', command: (event) => {
                this.removeNode(item)
            }
            }
        ]);
    }
    
    showContextMenu(event, contextMenu, item) {
        event.preventDefault();
        event.stopPropagation();
        this.bindItemToContextMenu(item);
        contextMenu.show(event);
        return false;
    }
    
    toggleEditField(node) {
        node.edit = !node.edit;
    }
    
    toggleShowingChildren(node) {
        if (node.collapsed == null) {
            node.collapsed = true;
        }
        else {
            node.collapsed = !node.collapsed;
        }
    }
    
    findNodeByKey(key) {
        return _.find(this.jsonData, (node) => {
            return node.key == key;
        });
    }
    
    findNodeByValue(value) {
        return _.find(this.jsonData, (node) => {
            return node.value == value;
        });
    }
    
    getJsonData() {
        return JSONIterablePipe.reversePipe(this.jsonData);
    }
    
}

import {
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import * as _ from "lodash";

@Component({
    selector: 'dynamic-component-injector',
    templateUrl: './component-injector.component.html',
    styleUrls: ['./component-injector.component.css'],
    entryComponents: [
        /*
        Components you want to dynamically load go here. Unfortunately I haven't found a good way to do this dynamically
        */
    ]
})
export class ComponentInjectorComponent {
    @ViewChild('templateOutput', {read: ViewContainerRef}) templateOutput;
    @Input() componentType;
    @Input() subFormData: InjectableSubForm;
    @Output() onComponentOutput: EventEmitter<any> = new EventEmitter<any>();
    @Output() onComponentInit: EventEmitter<any> = new EventEmitter<any>();

    componentReference: ComponentRef<any>;
    private isViewInitialized: boolean = false;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    async updateComponent(componentHasChanged: boolean) {
        if (!this.isViewInitialized) {
            return;
        }
        if (componentHasChanged) {
            if (this.componentReference) {
                this.componentReference.destroy();
            }
            let factory = this.componentFactoryResolver.resolveComponentFactory(this.componentType);
            this.componentReference = this.templateOutput.createComponent(factory);
            await this.componentReference.instance.ngOnInit();
            this.cdRef.detectChanges();
            this.onComponentInit.emit(this.componentReference.instance);
            //Subscribe to all output hooks the component might have
            _.forEach(Object.keys(this.componentReference.instance), (key) => {
                if (this.componentReference.instance[key] instanceof EventEmitter) {
                    this.componentReference.instance[key].subscribe((output) => {
                        this.onComponentOutput.emit({outputType: key, output: output});
                    });
                }
            });
        }
        //Update component data
        this.componentReference.instance.formType = this.subFormData.formType;
        this.componentReference.instance.columnsToHide = this.subFormData.hideFields;
        if (this.subFormData.inputData != null) {
            this.componentReference.instance.addFormData(this.subFormData.inputData);
        }
        if (this.subFormData.triggerSubmit) {
            this.componentReference.instance.submitEntry(null);
        }
        this.componentReference.instance.formData = _.cloneDeep(this.subFormData.inputData);
        this.cdRef.detectChanges();
    }

    ngOnChanges(change) {
        this.updateComponent(change.componentType != null);
    }

    ngAfterViewInit() {
        this.isViewInitialized = true;
        this.updateComponent(true);
    }

    ngOnDestroy() {
        if (this.componentReference) {
            this.componentReference.destroy();
        }
        this.cdRef.detach();
    }

}

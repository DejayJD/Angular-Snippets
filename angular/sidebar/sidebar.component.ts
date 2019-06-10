import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import * as _ from "lodash";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
/*
    EXAMPLE sideBarNavigationItems INPUT :
    [
      {
        header: null,  <------- Null headers will not be displayed
        items: [
          {label: 'Overview', icon: 'DashboardIcon.svg', selected: true, command: null},
          {label: 'Activity Log', icon: 'ActivityLogIcon.svg', disabled: true, command: null}
        ]
      },
      {
        header: "Settings",
        items: [
          {label: 'Networking', icon: 'NetworkingIcon.svg', command: null},
          {label: 'Disks', icon: 'DisksIcon.svg', command: null},
          {label: 'Service Accounts', icon: 'ServiceAccountsIcon.svg', command: null}
        ]
      }
    ];
   */

export class SidebarComponent implements OnInit {
    @Input() sideBarNavigationItems;
    @Input() defaultNavItem: string;
    @Input() urlRoute: string;
    @Input() selectedItem: any;
  @Output() selectedSidebarItem: EventEmitter<any> = new EventEmitter<any>();

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.openDefaultItem();
    }

    openDefaultItem() {

        if (this.sideBarNavigationItems && this.defaultNavItem) {
          let currentSelection = this.getCurrentSelected();
          currentSelection = (!!currentSelection && currentSelection !== this.defaultNavItem) ? currentSelection : this.defaultNavItem;
          // currentSelection = (!!this.selectedItem) ? this.selectedItem: currentSelection;
           this.navigateOpenedItem(this.getSubNavItem(currentSelection)[0], false);
        }
    }

    getCurrentSelected() {
        if (this.sideBarNavigationItems) {
            const subNav = this.filterNavItems('selected', true)[0];
            if (subNav) {
                this.clearOtherSubNavs(subNav);
                return subNav['label'];
            }
        }
    }

    clearOtherSubNavs(navToOmit) {
        _(this.sideBarNavigationItems)
            .map('items')
            .flatten()
            .value()
            .map(nav => {
                if (nav != navToOmit) nav['selected'] = false
            });
    }

    filterNavItems(valueToCheck, filterValue) {
        let filter = {};
        filter[valueToCheck] = filterValue;
        return _(this.sideBarNavigationItems)
            .map('items')
            .flatten()
            .filter(filter)
            .value();
    }

    getSubNavItem(label) {
        return _(this.sideBarNavigationItems)
            .map('items')
            .flatten()
            .filter((nav) => {
                return nav['label'] == label
            })
            .value();
    }

    navigateOpenedItem(data, updateRouter = true) {
        if (!data['disabled']) {
            _(this.sideBarNavigationItems)
                .map('items')
                .flatten()
                .value()
                .forEach((subitem) => {

                    if (subitem['label'] == data.label) {
                        subitem['selected'] = true;
                        if (updateRouter && this.urlRoute) {
                            this.router.navigate([this.urlRoute], {
                                queryParamsHandling: 'merge',
                                queryParams: {subnav: subitem['label']}
                            });
                        }
                        this.selectedSidebarItem.emit(subitem);
                    } else {
                        subitem['selected'] = false;
                    }
                });
        }
    }

    switchSubNavs(subNav) {
        if (subNav) {
            this.navigateOpenedItem(subNav, false);
        }
    }
}


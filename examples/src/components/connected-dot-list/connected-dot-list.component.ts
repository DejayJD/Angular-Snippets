import {Component, Input, OnInit} from "@angular/core";

class ListData {
  detail?: {
    code?: string;
    text?: string;
  };
  color?: 'green' | 'yellow' | 'blue' | 'red';
  text?: string;
}

@Component({
  selector: 'app-connected-dot-list',
  templateUrl: './connected-dot-list.component.html',
  styleUrls: ['./connected-dot-list.component.scss']
})
export class ConnectedDotListComponent implements OnInit {
  @Input() listData: ListData[];
  @Input() contentDirection: 'vertical' | 'horizontal' = 'vertical'; //default vertical
  @Input() minBarSize: string;

  constructor() {
  }

  ngOnInit() {
  }

}

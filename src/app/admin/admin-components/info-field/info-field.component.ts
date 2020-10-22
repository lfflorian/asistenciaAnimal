import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-field',
  templateUrl: './info-field.component.html',
  styleUrls: ['./info-field.component.scss']
})
export class InfoFieldComponent implements OnInit {

  @Input() Field: any;
  @Input() Value: any;
  constructor() { }

  ngOnInit() {
  }

}

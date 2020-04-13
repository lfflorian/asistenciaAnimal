import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
  @Input() Data;
  @Input() RouteLink;
  ShowData : any;
  Headers : Array<any>;
  ElementsCount : number;
  TotalPage : number;
  Pages : number;
  filterOption : any;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.Data) {
      this.Headers = Array.from(Object.keys(this.Data[0]));
      this.ElementsCount = 15;
      this.Pages = Math.ceil(this.Data.length / this.ElementsCount);
      this.ShowData = this.Data.slice(0, this.ElementsCount)
    }
  }

  selected(i : any) {
    this.router.navigateByUrl(i);
  }

  range(n : number) {
    return new Array(n);
  }

  changePage(n : number) {
    let to = this.ElementsCount * n;
    to = to >= this.Data.length ? this.Data.length : to;
    let from = to - (this.ElementsCount)
    from = from <= 0 ? 0 : from
    this.ShowData = this.Data.slice(from, to); 
  }
}
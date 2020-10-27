import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'app/model/company';
import { CompanyService } from 'app/services/company.service';

@Component({
  selector: 'app-copmany-list',
  templateUrl: './copmany-list.component.html',
  styleUrls: ['./copmany-list.component.scss']
})
export class CopmanyListComponent implements OnInit {

  constructor(private companyService: CompanyService,
    private router: Router) { }

  CompanyList : Company[];

  ngOnInit() {
    this.companyService.getCompanys().subscribe(c => {
      this.CompanyList = c;
    });
  }

  GoTo(id : string) {
    this.router.navigateByUrl('page/empresa/' + id)
  }
}

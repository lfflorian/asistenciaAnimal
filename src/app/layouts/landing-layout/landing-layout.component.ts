import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-layout',
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.scss']
})
export class LandingLayoutComponent implements OnInit {

  constructor(private router: Router) { }
  isIn = true;   // store state
  toggleState() { // click handler
      let bool = this.isIn;
      this.isIn = bool === false ? true : false; 
  }
  
  enabledmenu: boolean = false;

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log("abriendo")
    this.isIn = true;
  }

  GoTo(url : string) {
    this.isIn = true;
    this.router.navigateByUrl(url)
  }
}

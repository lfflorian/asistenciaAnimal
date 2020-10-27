import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private modelService: UserService) { }

  user : User;

  ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    this.modelService.getUser(Id).subscribe((response) => {
      this.user = response
    });
  }

}

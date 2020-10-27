import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Commentary } from 'app/model/Commentary';
import { Post } from 'app/model/post';
import { User } from 'app/model/user';
import { PostService } from 'app/services/post.service';
import { AuthService } from 'app/services/utilities/auth.service';

@Component({
  selector: 'app-alert-view',
  templateUrl: './alert-view.component.html',
  styleUrls: ['./alert-view.component.scss']
})
export class AlertViewComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private modelService: PostService,
    private authService: AuthService) { }

  commentForm : FormControl = new FormControl();;
  alert: Post;
  comment: Commentary;
  user: User;

  async ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")

    try {
      this.user = await this.authService.getUser();
    } catch (error) {
    }

    this.modelService.getPost(Id).subscribe((response) => {
      this.alert = response
    });
  }

  leftComment() {
    if (this.user) {
      this.comment = {
        Content : this.commentForm.value,
        Date : new Date(),
        IdAuthor : this.user.id
      }

      if (this.alert.Comments) {
        this.alert.Comments.push(this.comment)
      } else {
        this.alert.Comments = [];
        this.alert.Comments.push(this.comment)
      }

      this.modelService.updatePost(this.alert).then((response) => {
        alert('Gracias por agregar tu comentario')
        this.commentForm.setValue('');
      });
    } else {
      alert('Debes iniciar sessión para poder dejar un comentario')
    }
  }

}

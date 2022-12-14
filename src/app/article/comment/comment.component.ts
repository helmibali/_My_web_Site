import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

import { ActiveCommentInterface } from 'src/app/model/activeComment';
import { ActiveCommentTypeEnum } from 'src/app/model/activeCommentTypeEnum';
import { Article } from 'src/app/model/article.model';
import { Cmt } from 'src/app/model/cmt.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';



@Component({
  selector: 'comment',

  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit { 

  user:User;
  comments : Cmt[];
  @Input() 
  cmt !: Cmt;
  @Input()
  a!: Article;
  @Input()
   activeComment!: ActiveCommentInterface | null;
  @Input()
   replies !: Cmt[];
  @Input()
   parentId:number|null;
  @Output()
  setActiveComment = new EventEmitter<ActiveCommentInterface | null>();
  @Output()
  deleteComment = new EventEmitter<string>();
  @Output()
  addComment = new EventEmitter<{
     text: string;
     parentId: number | null;
     }>();


  @Output()
  updateComment = new EventEmitter<{ text: string; commentId: number }>();

  createdAt: string = '';
  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  activeCommentType = ActiveCommentTypeEnum;
  replyId: number | null = null;
  currentUsername:string=this.authService.loggedUser;
  constructor(
    public commentService:CommentService,
              public authService : AuthService,
  ) { }
  
  ngOnInit(): void {
   
    

        this.canReply = Boolean(this.currentUsername);
      
        this.canDelete = this.currentUsername === this.cmt.user.username   
  } 
}

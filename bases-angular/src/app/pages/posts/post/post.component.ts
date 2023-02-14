import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post: any;
  @Output() clickPost = new EventEmitter()

  onClick() {
    console.log(this.post.id)
    this.clickPost.emit(this.post.id)
  }
}

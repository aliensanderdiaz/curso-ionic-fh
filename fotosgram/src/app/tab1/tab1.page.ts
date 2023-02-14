import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/interfaces';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = []
  habilitado = true

  constructor(
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.siguientes()
    this.habilitado = true
    this.posts = []
    this.postsService.nuevoPost.subscribe(post => {
      this.posts.unshift(post)
    })
  }

  siguientes(event?: any, pull: boolean = false) {
    this.postsService.getPosts( pull ).subscribe(data => {
      console.log({ data })
      if (pull) {
        this.posts = []
      }
      this.posts.push(...data.posts)

      if (event) {
        event.target.complete()

        if (data.posts.length === 0) {
          // event.target.disabled = true
          this.habilitado = false
        }
      }
    })
  }

  recargar(event?: any) {
    this.siguientes(event, true)
  }

}

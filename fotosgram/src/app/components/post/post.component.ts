import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post! : Post
  // img1 = 'perro-1.jpg'
  // img2 = 'perro-2.jpg'
  // img3 = 'perro-3.jpg'
  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };
  constructor() { }

  ngOnInit() {}

}

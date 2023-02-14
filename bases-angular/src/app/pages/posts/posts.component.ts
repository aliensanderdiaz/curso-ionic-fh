import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  mensajes: any

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // this.dataService.getPosts().subscribe(data => {
    //   this.mensajes = data
    // })
    this.mensajes = this.dataService.getPosts()
  }

  escuchaClick(id: any) {
    console.log({ id })
  }
}

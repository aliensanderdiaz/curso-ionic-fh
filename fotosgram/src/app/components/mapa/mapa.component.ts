import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coords!: string | undefined;

  constructor() { }

  ngOnInit() {
    console.log({ coords: this.coords })
  }

}

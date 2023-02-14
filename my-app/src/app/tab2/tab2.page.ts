import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  numero: number = 10

  constructor() {
    this.numero = 11
    this.numero = 12
    this.numero = 13
    debugger
    this.numero = 11
  }

}

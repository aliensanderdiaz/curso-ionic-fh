import { Component, OnInit } from '@angular/core';

interface Componente {
  icon: string;
  name: string;
  redirectTo: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes: Componente[] = [
    {
      icon: 'american-football',
      name: 'Action Sheet',
      redirectTo: '/action-sheet'
    },
    {
      icon: 'alert-circle-outline',
      name: 'Alert',
      redirectTo: '/alert'
    },
    {
      icon: 'person-outline',
      name: 'Avatar',
      redirectTo: '/avatar'
    },
    {
      icon: 'play-outline',
      name: 'Button',
      redirectTo: '/button'
    },
    {
      icon: 'mail-outline',
      name: 'Card',
      redirectTo: '/card'
    },
    {
      icon: 'checkbox-outline',
      name: 'Checkbox',
      redirectTo: '/check'
    },
    {
      icon: 'calendar-outline',
      name: 'DateTime',
      redirectTo: '/date-time'
    },
    {
      icon: 'radio-button-on-outline',
      name: 'Fab',
      redirectTo: '/fab'
    },
    {
      icon: 'radio-button-on-outline',
      name: 'Grid',
      redirectTo: '/grid'
    },
    {
      icon: 'infinite-outline',
      name: 'Infinite Scroll',
      redirectTo: '/infinite'
    },
    {
      icon: 'infinite-outline',
      name: 'Input',
      redirectTo: '/input'
    },
    {
      icon: 'infinite-outline',
      name: 'List',
      redirectTo: '/list'
    },
    {
      icon: 'infinite-outline',
      name: 'List Reorder',
      redirectTo: '/list-reorder'
    },
    {
      icon: 'infinite-outline',
      name: 'Loading',
      redirectTo: '/loading'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}

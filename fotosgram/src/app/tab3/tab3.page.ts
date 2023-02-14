import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Usuario } from '../interfaces/interfaces';
import { UiService } from '../services/ui-service.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {}

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiService
    ) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.getUsuario()
    console.log(this.usuario)
  }

  logout() {}

  async update(fregister: NgForm) {
    if (fregister.invalid) {
      return
    }
    console.log(fregister);
    const valido = await this.usuarioService.actualizaUsuario(this.usuario)

    if (valido) {
      // this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true })
      this.uiService.presentToast('bottom', 'Usuario Actualizado')
    } else {
      // this.uiService.alertaInformativa('Sucedió algo mal')
      this.uiService.presentToast('middle', 'ERROR')
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, ViewDidEnter } from '@ionic/angular';
import { UiService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, ViewDidEnter {

  @ViewChild('slidePrincipal') slides!: IonSlides;




  slideLogin = {
    allowSlideNext: false,
    allowSlidePrev: false,
  }

  loginUser = {
    email: 'alex@gmail.com',
    password: '12345'
  }

  registerUser = {
    email: 'alex@gmail.com',
    password: '12345',
    nombre: 'Alex',
    avatar: 'av-1.png'
  }

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiService
  ) {}

  ionViewDidEnter(): void {
    // throw new Error('Method not implemented.');
    this.slides.lockSwipes( true );
  }

  ngOnInit() {
    // this.slides.lockSwipes( true );
  }

  async login(flogin: NgForm) {
    if (flogin.invalid) {
      return
    }
    console.log(flogin);
    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password)

    if (valido) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true })
    } else {
      this.uiService.alertaInformativa('Sucedió algo mal')
    }
  }

  async registro(fregister: NgForm) {
    if (fregister.invalid) {
      return
    }
    console.log(fregister);
    const valido = await this.usuarioService.registro(this.registerUser)

    if (valido) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true })
    } else {
      this.uiService.alertaInformativa('Sucedió algo mal')
    }
  }



  mostrarRegistro() {
    this.slides.lockSwipes(false)
    this.slides.slideTo(1)
    this.slides.lockSwipes(true)
  }

  mostrarLogin() {
    this.slides.lockSwipes(false)
    this.slides.slideTo(0)
    this.slides.lockSwipes(true)
  }
}

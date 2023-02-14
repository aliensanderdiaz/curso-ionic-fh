import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private _storage: Storage | null = null;
  token: string = '';
  private usuario: Usuario = {}

  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    this.cargarToken()
  }

  login(email: string, password: string) {
    const data = { email, password };

    return new Promise((resolve) => {
      this.http.post(`${URL}/user/login`, data).subscribe((resp: any) => {
        console.log({ resp });
        if (resp['ok']) {
          this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = '';
          resolve(false);
        }
      });
    });
  }

  getUsuario() {
    return {...this.usuario}
  }

  registro(usuario: Usuario) {


    return new Promise((resolve) => {
      this.http.post(`${URL}/user/create`, usuario).subscribe((resp: any) => {
        console.log({ resp });
        if (resp['ok']) {
          this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = '';
          resolve(false);
        }
      });
    });
  }

  async guardarToken(token: string) {
    this.token = token;
    if (this._storage) {
      await this._storage.set('token', token);
    }
  }

  async cargarToken() {
    this.token = await this._storage?.get('token') || ''
    console.log({ token: this.token })
  }

  async validaToken(): Promise<boolean> {
    await this.cargarToken()
    if (this.token === '') {
      this.navCtrl.navigateRoot('/login')
      return Promise.resolve(false)
    }
    const headers = new HttpHeaders({
      'x-token': this.token
    })
    return new Promise<boolean>(resolve => {
      this.http.get(`${ URL }/user`, { headers })
        .subscribe( (resp: any) => {
          if (resp['ok']) {
            this.usuario = resp['usuario']
            resolve(true)
          } else {
            resolve(false)
          }
        })
    })
  }

  actualizaUsuario(usuario: Usuario) {
    const headers = new HttpHeaders({
      'x-token': this.token
    })
    return new Promise((resolve) => {
      this.http.post(`${URL}/user/update`, usuario, { headers }).subscribe((resp: any) => {
        console.log({ resp });
        if (resp['ok']) {
          this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = '';
          resolve(false);
        }
      });
    });
  }
}

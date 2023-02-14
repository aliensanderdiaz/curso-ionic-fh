import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../interfaces/interfaces';
import { PostsService } from '../services/posts.service';

import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { UsuarioService } from '../services/usuario.service';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  comoEs: string = 'Como seria'

  tempImages: string[] = []
  tempImagesPath: string[] = []
  cargandoGeo = false

  post: Post = {
    mensaje: '',
    coords: '',
    posicion: false
  }

  constructor(
    private postsService: PostsService,
    private route: Router,
    private transfer: FileTransfer,
    private usuarioService: UsuarioService
  ) {}

  async crearPost() {
    console.log({ post: this.post })
    const creado: any = await this.postsService.crearPost(this.post)
    console.log({ creado })
    if (creado) {
      this.post = {
        mensaje: '',
        coords: '',
        posicion: false
      }
      this.route.navigateByUrl('/main/tabs/tab1')
    }
  }

  async getLeocalization() {



    if (!this.post.posicion) {
      this.post.coords = ''
      this.cargandoGeo = false
      return
    }

    this.cargandoGeo = true

    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position:', coordinates);

    this.post.coords = '' + coordinates.coords.latitude + ',' + coordinates.coords.longitude

    this.cargandoGeo = false

    console.log({
      post: this.post
    })
  }

  async abrirCamara() {
    const image = await Camera.getPhoto({
      quality: 100,
      // allowEditing: true,
      height: 200,
      correctOrientation: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri
    });

    const imageWebPath = image.webPath;
    const imagePath = image.path;

    this.tempImages.push(<string>imageWebPath);
    this.tempImagesPath.push(<string>imagePath)
  }

  upload() {
    console.log({ funcion: 'UPLOAD'})

    let options: FileUploadOptions = {
       fileKey: 'image',
       headers: {
        'x-token': this.usuarioService.token
       }
    }

    const fileTransfer: FileTransferObject = this.transfer.create();

    console.log({
      options,
      fileTransfer,
      img: this.tempImages[0]
    })

    fileTransfer.upload(this.tempImagesPath[0], `http://192.168.20.20:3000/posts/upload`, options)
     .then((data) => {
       console.log({ data })
     }, (err) => {
       console.log({ err })
     })
  }

}

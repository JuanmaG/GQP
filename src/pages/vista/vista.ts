import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import {AnadirPage} from "../anadir/anadir";
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';
import { EditarPage} from '../editar/editar';

@IonicPage()
@Component({
  selector: 'page-vista',
  templateUrl: 'vista.html',
})
export class VistaPage {

  //Declaraciones
  perro:any={};
  browser=HomePage;
  anadir=AnadirPage;

  constructor(private screenshot: Screenshot,
              public socialSharing: SocialSharing,
              public navCtrl: NavController,
              public navParams: NavParams) {

    console.log(navParams);
    this.perro=this.navParams.get("perro");
  }

  private toDataUrl(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
              callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
  }

  public share() {
    let env = this;
    this.toDataUrl(this.perro.image, function(base64) {
      let msg = 'Perro en adopción en ' + env.perro.city + ', ' + env.perro.town + '. Más información en '
      let url = "http://guauqueanimales.com/detalle/" + env.perro.id
      env.socialSharing.share(msg, null, base64, url);
    });
  }

  //Funcion general para cambiar de pagina
  abrirPagina(pagina:any){
    this.navCtrl.push(pagina);
  }

  //Funcion para volver a la pagina anterior
  goBack() {
  this.navCtrl.pop();
  }

  //Funcion que comparte mediante facebook,haciendo un screenshot de la pantalla y compartiendo esa imagen y
  //un mensaje,si se esta loggado en FB
  facebookShare() {
  this.screenshot.URI(80)
    .then((res) => {
      this.socialSharing.shareViaFacebook(null, res.URI, null)
       .then(() => {},
         () => {
           alert('SocialSharing failed');
         });
       },
      () => {
      alert('Screenshot failed');
      });
    }

    editar(perro:any){
      this.navCtrl.push(EditarPage,{'perro':perro});
    }

}

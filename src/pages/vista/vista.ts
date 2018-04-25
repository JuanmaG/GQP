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
  perros:any={};
  browser=HomePage;
  anadir=AnadirPage;

  constructor(private screenshot: Screenshot,
              public socialSharing: SocialSharing,
              public navCtrl: NavController,
              public navParams: NavParams) {

    console.log(navParams);
    this.perro=this.navParams.get("perro");
  }

  //Funcion general para cambiar de pagina
  abrirPagina(pagina:any){
    this.navCtrl.push(pagina);
  }

  //Funcion para volver a la pagina anterior
  goBack() {
  this.navCtrl.pop();
  }
  //Funcion que usa SocialSharing que toma un screenshot de la pantalla
  //y manda un mensaje + la foto mediante la app que elija el usuario,si es posible
  share(img){
    var msg = "compartidoViaGuauQueAnimales";
    let imagen="data:image/jpeg;base64," + img;
    this.screenshot.URI(80)
      .then((res) => {
        this.socialSharing.share(msg,null, res.URI, null)
          .then(() => {},
          () => {
              alert('SocialSharing failed');
            });
        },
       () => {
        alert('Screenshot failed');
        });
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

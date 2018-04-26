import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';
@IonicPage()
@Component({
  selector: 'page-misanuncios',
  templateUrl: 'misanuncios.html',
})
export class MisanunciosPage {

  constructor(private screenshot: Screenshot,
              public socialSharing: SocialSharing,
              public navCtrl: NavController,
              public navParams: NavParams) {
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
}

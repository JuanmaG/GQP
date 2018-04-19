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
  perro:any={};
  contact=false;
  story=false;
  browser=HomePage;
  anadir=AnadirPage;
  constructor(private screenshot: Screenshot,public socialSharing: SocialSharing,public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams);
    this.perro=this.navParams.get("perro");
  }
  abrirPagina(pagina:any){
    this.navCtrl.push(pagina);
  }
  goBack() {
  this.navCtrl.pop();
}
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
    contactInfo() {
        this.contact= !this.contact;
    }
    showStory() {
        this.story= !this.story;
    }
    editar(perro:any){
      this.navCtrl.push(EditarPage,{'perro':perro});
    }
}

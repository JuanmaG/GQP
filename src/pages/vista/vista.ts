import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import {AnadirPage} from "../anadir/anadir";
import { SocialSharing } from '@ionic-native/social-sharing';
@IonicPage()
@Component({
  selector: 'page-vista',
  templateUrl: 'vista.html',
})
export class VistaPage {
  perros:any={};
  browser=HomePage;
  anadir=AnadirPage;
  constructor(public socialSharing: SocialSharing,public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams);
    this.perros=this.navParams.get("perros");
  }
  abrirPagina(pagina:any){
    this.navCtrl.push(pagina);
  }
  goBack() {
  this.navCtrl.pop();
}
share(){
  var msg = "compartidoViaGuauQueAnimales";

  this.socialSharing.share(msg, null, null, null);
}
}

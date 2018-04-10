import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import {AnadirPage} from "../anadir/anadir";

@IonicPage()
@Component({
  selector: 'page-vista',
  templateUrl: 'vista.html',
})
export class VistaPage {
  perros:any={};
  browser=HomePage;
  anadir=AnadirPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams);
    this.perros=this.navParams.get("perros");
  }
  abrirPagina(pagina:any){
    this.navCtrl.push(pagina);
  }
  goBack() {
  this.navCtrl.pop();
}
}

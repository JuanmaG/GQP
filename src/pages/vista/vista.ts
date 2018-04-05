import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VistaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vista',
  templateUrl: 'vista.html',
})
export class VistaPage {
  perros:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams);
    this.perros=this.navParams.get("perros");
  }
}

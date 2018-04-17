import { Component } from '@angular/core';
import { NavController,NavParams,MenuController } from 'ionic-angular';
import {VistaPage,AnadirPage} from "../index.paginas";
import { Http } from '@angular/http';
import {PerrosService}from "../../providers/perros";
import 'rxjs/add/operator/map';
  @Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl:NavController,
    public navParams: NavParams,
    public http: Http,
    public menuCtrl:MenuController,
    private _ps:PerrosService) {
  }

  doRefresh(refresher) {
  console.log('Begin async operation', refresher);
  console.log(this._ps.perros);
  setTimeout(() => {
    console.log('Async operation has ended');
    refresher.complete();
  }, 2000);
}
  vista(perro:any){
    this.navCtrl.push(VistaPage,{'perro':perro});
  }
  mostrarMenu(){
    this.menuCtrl.toggle();
  }
}

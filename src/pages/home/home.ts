import { Component } from '@angular/core';
import { NavController,NavParams,MenuController } from 'ionic-angular';
import { PERROS } from "../../data/data.perros";
import { Perros } from "../../interfaces/perros.interface";
import {VistaPage,AnadirPage} from "../index.paginas";
  @Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    perros:Perros[] = [];
  constructor(public navCtrl:NavController,
    public navParams: NavParams,
    public menuCtrl:MenuController) {
    this.perros = PERROS.slice(0);
  }
  vista(perro:any){
    this.navCtrl.push(VistaPage,{'perros':perro});
  }
  mostrarMenu(){
    this.menuCtrl.toggle();
  }
}

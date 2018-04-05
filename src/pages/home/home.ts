import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PERROS } from "../../data/data.perros";
import { Perros } from "../../interfaces/perros.interface";
import {VistaPage} from "../index.paginas";
  @Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    perros:Perros[] = [];
  constructor(public navCtrl:NavController) {
    this.perros = PERROS.slice(0);
  }
  vista(){
    this.navCtrl.push(VistaPage);
  }
}

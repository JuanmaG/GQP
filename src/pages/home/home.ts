import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PERROS } from "../../data/data.perros";
import { Perros } from "../../interfaces/perros.interface";
  @Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    perros:Perros[] = [];
  constructor() {
    this.perros = PERROS.slice(0);
  }
  vista(  perro:Perros  ){
    console.log( perro );
  }
}

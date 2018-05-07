import { Component } from '@angular/core';
import { NavController,NavParams,MenuController } from 'ionic-angular';
import {VistaPage } from "../index.paginas";
import { Http } from '@angular/http';
import {PerrosService}from "../../providers/perros";
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
  @Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //Declaraciones
  story=false;
  newperros:any[]=[];

  constructor(public navCtrl:NavController,
    public navParams: NavParams,
    public http: Http,
    public menuCtrl:MenuController,
    private _ps:PerrosService,
    public loadingController:LoadingController) {
  }
//Carga de los animales mediante http get a la api
cargar(){
  this.http.get("http://guauqueanimales.com/dogs/adopteds/")
            .map( resp => resp.json() )
            .subscribe( data=>{
              console.log(data);
              if(data.error){
              }else{
                this.newperros.push(...data);
                this._ps.perros=this.newperros;
              }})
}

  //Funcion del Refresher
  doRefresh(refresher) {
    console.log("refreshing");
    setTimeout(() => {
      refresher.complete();
      this.cargar();
    }, 2000);
  }

  //Funcion para pasar el perro clickado a la vista en detalle
  vista(perro:any){
    this.navCtrl.push(VistaPage,{'perro':perro});
  }

  //Controlador del menu
  mostrarMenu(){
    this.menuCtrl.toggle();
  }

  showStory() {
      this.story= !this.story;
  }
}

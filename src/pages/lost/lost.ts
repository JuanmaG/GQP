import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams,MenuController } from 'ionic-angular';
import {VistaPage} from "../index.paginas";
import { Http } from '@angular/http';
import {LostedsService}from "../../providers/losteds";
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-lost',
  templateUrl: 'lost.html',
})
export class LostPage {

    story=false;
    newperros:any[]=[];
    rootNavCtrl: NavController;

    constructor(public navCtrl:NavController,
      public http: Http,
      public menuCtrl:MenuController,
      private _ps:LostedsService,
      public loadingController:LoadingController,
      private navParams: NavParams) {
        this.rootNavCtrl = this.navParams.get('rootNavCtrl')
      }


    ionViewDidLoad() {
      console.log('ionViewDidLoad AdoptedsPage');
    }

    //Carga de los animales mediante http get a la api
    cargar(){
      this.http.get("http://guauqueanimales.com/dogs/losteds/")
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
    vista(perro:any) {
      this.rootNavCtrl.push(VistaPage, {'perro': perro});
    }


    //Controlador del menu
    mostrarMenu(){
      this.menuCtrl.toggle();
    }

    showStory() {
        this.story= !this.story;
    }

  }

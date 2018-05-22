import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {VistaPage} from "../index.paginas";
import { Http } from '@angular/http';
import {FindedsService}from "../../providers/findeds";
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-found',
  templateUrl: 'found.html',
})
export class FoundPage {

    story=false;
    newperros:any[]=[];
    rootNavCtrl: NavController;

    constructor(public navCtrl:NavController,
      public http: Http,
      public menuCtrl:MenuController,
      private _ps:FindedsService,
      public loadingController:LoadingController,
      private navParams: NavParams,
      private emailComposer: EmailComposer) {
        this.rootNavCtrl = this.navParams.get('rootNavCtrl')
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad AdoptedsPage');
    }

    //Carga de los animales mediante http get a la api
    cargar(){
      this.http.get("http://guauqueanimales.com/dogs/findeds/")
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
    sendEmail(
               to         : string,
               cc         : string,
               bcc        : string,
               attachment : string,
               subject    : string,
               body       : string) : void
      {

        this.emailComposer.isAvailable()
        .then((available: boolean) =>
        {

           this.emailComposer.hasPermission()
           .then((isPermitted : boolean) =>
           {

              let email : any = {
                 app 			: 'jgarridolechuga@gmail.com',
                 to 			: 'jgarridolechuga@gmail.com',
                 cc 			: 'jgarridolechuga@gmail.com',
                 bcc 			: 'jgarridolechuga@gmail.com',
                 subject 	: 'report',
                 body 		: 'report'
              };
              this.emailComposer.open(email);
           })
           .catch((error : any) =>
           {
              console.log('No access permission granted');
              console.dir(error);
           });
        })
        .catch((error : any) =>
        {
           console.log('Parece ser que el usuario no tiene una cuenta de email configurada');
           console.dir(error);
        });
     }
}

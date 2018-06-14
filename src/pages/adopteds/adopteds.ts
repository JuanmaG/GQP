import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {VistaPage} from "../index.paginas";
import { Http } from '@angular/http';
import {PerrosService}from "../../providers/perros";
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { AuthService } from '../../providers/auth0.service';
import { FiltersService } from '../../providers/filters';

@IonicPage()
@Component({
  selector: 'page-adopteds',
  templateUrl: 'adopteds.html',
})
export class AdoptedsPage {

  story=false;
  newperros:any[]=[];
  rootNavCtrl: NavController;
  comprobadorRaza:boolean;
  comprobadorVacuna:boolean;
  comprobadorSexo:boolean;

  constructor(public navCtrl:NavController,
    public http: Http,
    public menuCtrl:MenuController,
    private _ps:PerrosService,
    public loadingController:LoadingController,
    private navParams: NavParams,
    private authService: AuthService,
    public filters:FiltersService,
    private emailComposer: EmailComposer) {
      this.rootNavCtrl = this.navParams.get('rootNavCtrl')
  }

  //Carga de los animales mediante http get a la api
  cargar(){
  this.http.get("http://127.0.0.1:8000/animal/", this.authService.getHeaders())
              .map( resp => resp.json() )
              .subscribe( data=>{
                console.log(data);
                if(data.error){
                }else{
                  this._ps.perros.push(...data);
                  this._ps.perros.reverse();
                }})

  }

  //Funcion del Refresher
  doRefresh(refresher) {
    console.log("refreshing");
    setTimeout(() => {
      this.cargar();
      refresher.complete();
    }, 2000);
  }
  checkFilters(perro){
    /*SI NO SE HAN APLICADO FILTROS*/
    if(this.filters.racefilter==false){
      this.comprobadorRaza=true;
    }
    if(this.filters.sexfilter==false){
      this.comprobadorSexo=true;
    }
    if(this.filters.vaccfilter==false){
      this.comprobadorVacuna=true;
    }
    /*********************************/
    /*APLICANDO FILTROS*/
    if(this.filters.racefilter){
      if(perro.race==this.filters.specifie){
        this.comprobadorRaza=true;
      }
      else if(perro.race!=this.filters.specifie){
        this.comprobadorRaza=false;
      }
    }
    if(this.filters.sexfilter){
      if(perro.genre==this.filters.type){
        this.comprobadorSexo=true;
      }
      else if(perro.genre!=this.filters.type){
        this.comprobadorSexo=false;
      }
    }
    if(perro.vaccinated=='True'&&this.filters.vaccfilter){
      this.comprobadorVacuna=true;
    }
    else if((perro.vaccinated=='False'&&this.filters.vaccfilter==true)||(perro.vaccinated=='True'&&this.filters.vaccfilter==false)){
      this.comprobadorVacuna=false;
    }
    /***********************************************************/
    /*******SI CUMPLE LOS FILTROS*******************************/
    if(this.comprobadorRaza && this.comprobadorSexo && this.comprobadorVacuna && perro.state=='Adopcion'){
      return true;
    }
    /***********************************************************/
    /**********************SI NO LOS CUMPLE*********************/
    if(this.comprobadorRaza==false || this.comprobadorSexo==false || this.comprobadorVacuna==false){
      return false;
    }
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

import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { EditarPage } from '../editar/editar';
import { Http } from '@angular/http';
import {PerrosService}from "../../providers/perros";
import { Item, ItemSliding } from 'ionic-angular';
import { AuthService } from '../../providers/auth0.service';
import { DetailService } from '../../providers/userdetails';
import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-misanuncios',
  templateUrl: 'misanuncios.html',
})
export class MisanunciosPage {

  perro:any={};
  activeItemSliding: ItemSliding = null;
  user:any={};
  id:string;

  constructor(public socialSharing: SocialSharing,
              public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              private authService: AuthService,
              private _ps:PerrosService,
              public loadingController: LoadingController,
              private _udet: DetailService) {
                this._udet.load();
  }
  //Funcion para comprobar que un perro pertenece al usuario actual
  checkLink(perro:any){

    if(perro.profile == this._udet.id){
      return true;
    }
    else{
      return false;
    }
  }

  private toDataUrl(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
              callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
  }
  //Funcion que usa SocialSharing
  //manda un mensaje + la foto mediante la app que elija el usuario,si es posible
  public share() {
    let env = this;
    this.toDataUrl(this.perro.image, function(base64) {
      let msg = 'Perro en adopción en ' + env.perro.city + ', ' + env.perro.town + '. Más información en '
      let url = "http://guauqueanimales.com/detalle/" + env.perro.id
      env.socialSharing.share(msg, null, base64, url);
    });
  }

  //Funcion que nos manda a la pagina editar
  public editar(perro:any){
    this.navCtrl.push(EditarPage,{'perro':perro});
  }
  //Funcion para volver atras
  public goBack() {
    this.navCtrl.pop();
  }

  //Funcion para abrir el item slider
  openOption(itemSlide: ItemSliding, item: Item) {

     if(this.activeItemSliding!==null) //No permita que haya mas dde un slide activo a la vez
     this.closeOption();

     this.activeItemSliding = itemSlide;

     let swipeAmount = 250; //cantidad de slide
     itemSlide.startSliding(swipeAmount);
     itemSlide.moveSliding(swipeAmount);

     itemSlide.setElementClass('active-options-right', true);
     itemSlide.setElementClass('active-swipe-right', true);

     item.setElementStyle('transition', null);
     item.setElementStyle('transform', 'translate3d(-'+swipeAmount+'px, 0px, 0px)');

  }

  //Funcion para cerra el item slider
  closeOption() {

      if(this.activeItemSliding) {
       this.activeItemSliding.close();
       this.activeItemSliding = null;
      }

   }


   delete(perrete:any) {
    const url="http://127.0.0.1:8000/delete_animal"

    let body = {
      'id':perrete.id
    };

    this.http.post(url, body, this.authService.getHeaders())
      .subscribe(data => {
        console.log(data);
      });
  }
}

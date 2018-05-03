import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { EditarPage } from '../editar/editar';
import { Http } from '@angular/http';
import {PerrosService}from "../../providers/perros";
@Component({
  selector: 'page-misanuncios',
  templateUrl: 'misanuncios.html',
})
export class MisanunciosPage {

  perro:any={};

  constructor(public socialSharing: SocialSharing,
              public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              private _ps:PerrosService) {
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

}

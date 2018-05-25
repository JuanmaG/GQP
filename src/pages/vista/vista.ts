import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AnadirPage } from "../anadir/anadir";
import { SocialSharing } from '@ionic-native/social-sharing';
import { EditarPage} from '../editar/editar';
import { Http } from '@angular/http';
import { AuthService } from '../../providers/auth0.service';
import { DetailService } from '../../providers/userdetails';
@IonicPage()
@Component({
  selector: 'page-vista',
  templateUrl: 'vista.html',
})
export class VistaPage {

  //Declaraciones
  perro:any={};
  browser=HomePage;
  anadir=AnadirPage;

  constructor(public socialSharing: SocialSharing,
              public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthService,
              private http: Http,
              private _udet:DetailService) {

              this._udet.load();
              
    console.log(navParams);
    this.perro=this.navParams.get("perro");
  }
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

  public share() {
    let env = this;
    this.toDataUrl(this.perro.image, function(base64) {
      let msg = 'Perro en adopción en ' + env.perro.city + ', ' + env.perro.town + '. Más información en '
      let url = "http://guauqueanimales.com/detalle/" + env.perro.id
      env.socialSharing.share(msg, null, base64, url);
    });
  }

  //Funcion general para cambiar de pagina
  abrirPagina(pagina:any){
    this.navCtrl.push(pagina);
  }

  //Funcion para volver a la pagina anterior
  goBack() {
  this.navCtrl.pop();
  }

  editar(perro:any){
    this.navCtrl.push(EditarPage,{'perro':perro});
  }
  delete() {
   const url="http://127.0.0.1:8000/delete_animal"

   let body = {
     'id':this.perro.id
   };

   this.http.post(url, body, this.authService.getHeaders())
     .subscribe(data => {
       console.log(data);
     });
 }
}

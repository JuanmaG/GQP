import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import {AnadirPage} from "../anadir/anadir";
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';
import { EditarPage} from '../editar/editar';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-vista',
  templateUrl: 'vista.html',
})
export class VistaPage {
  perro:any={};
  contact=false;
  story=false;
  browser=HomePage;
  anadir=AnadirPage;
  constructor(private screenshot: Screenshot,public socialSharing: SocialSharing,public navCtrl: NavController, public navParams: NavParams,private domSanitizer: DomSanitizer) {
    console.log(navParams);
    this.perro=this.navParams.get("perro");
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

  abrirPagina(pagina:any){
    this.navCtrl.push(pagina);
  }

  goBack() {
    this.navCtrl.pop();
  }

  facebookShare() {
  this.screenshot.URI(80)
    .then((res) => {
      this.socialSharing.shareViaFacebook(null, res.URI, null)
       .then(() => {},
         () => {
           alert('SocialSharing failed');
         });
       },
      () => {
      alert('Screenshot failed');
      });
    }
    contactInfo() {
        this.contact= !this.contact;
    }
    showStory() {
        this.story= !this.story;
    }
    editar(perro:any){
      this.navCtrl.push(EditarPage,{'perro':perro});
    }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';
@IonicPage()
@Component({
  selector: 'page-misanuncios',
  templateUrl: 'misanuncios.html',
})
export class MisanunciosPage {

  constructor(private screenshot: Screenshot,public socialSharing: SocialSharing,public navCtrl: NavController, public navParams: NavParams) {
  }
  share(img){
    var msg = "compartidoViaGuauQueAnimales";
    let imagen="data:image/jpeg;base64," + img;
    this.screenshot.URI(80)
      .then((res) => {
        this.socialSharing.share(msg,null, res.URI, null)
         .then(() => {},
           () => {
             alert('SocialSharing failed');
           });
         },
        () => {
        alert('Screenshot failed');
        });
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
}

import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class AlertService {

  constructor(private alertCtrl: AlertController) {
  }

  show(title = '', subtitle = '') {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['Aceptar']
    });
    alert.present();
  }

}

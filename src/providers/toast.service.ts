import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastService {

  constructor(private toastCtrl: ToastController) {
  }

  show(message= '') {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'bottom'
    });

    toast.present();
  }
}

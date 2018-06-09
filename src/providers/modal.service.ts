import { Injectable } from '@angular/core';
import { ModalController, LoadingController } from 'ionic-angular';

@Injectable()
export class ModalService {

  public loading: any;

  constructor (
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController
  ) {}

  showLoading(message) {
    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePicker,ImagePickerOptions} from '@ionic-native/image-picker';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  browser=HomePage;
  slideOneForm: FormGroup;
  constructor(private toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private imagePicker: ImagePicker) {
    this.slideOneForm = formBuilder.group({
    firstName: [''],
    lastName: [''],
    age: ['']
});
}

presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Work In Progress',
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
abrirPagina(pagina:any){
  this.navCtrl.push(pagina);
}
}

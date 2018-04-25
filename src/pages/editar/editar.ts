import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePicker,ImagePickerOptions} from '@ionic-native/image-picker';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HomePage } from '../home/home';
@IonicPage()
@Component({
  selector: 'page-editar',
  templateUrl: 'editar.html',
})
export class EditarPage {

  //Declaraciones
  slideOneForm: FormGroup;
  imgPreview: string;
  perro:any={};
  browser:HomePage;

  constructor(public socialSharing: SocialSharing,
              public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private imagePicker: ImagePicker) {

        //Recepcion parametros perro
        this.perro=this.navParams.get("perro");

        //Preparacion del Forms
        this.slideOneForm = formBuilder.group({
        firstName: [this.perro.name],
        pais: [this.perro.state],
        ciudad: [this.perro.city],
        poblacion:[this.perro.town],
        correo:[this.perro.email],
        telefono:[this.perro.phone],
        lastName: [''],
        weight:[''],
        descripcion: [this.perro.description],
        edad: [this.perro.age]
    });
  }
  //Funcion que nos permite seleccionar una foto con el componente imagePicker
  seleccionarFoto(){
    let options:ImagePickerOptions = {
      quality:100,
      outputType: 1,
      maximumImagesCount: 1
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.imgPreview="data:image/jpeg;base64," + results[i];
      }
    }, (err) => {
      console.log("ERROR en la imagen");
    });
  }
  //Funcion que nos permite volver a la pantalla home
  goBack() {
    this.navCtrl.popTo(HomePage);
  }
}

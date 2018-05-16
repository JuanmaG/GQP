import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImagePicker,ImagePickerOptions} from '@ionic-native/image-picker';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth0.service';
import { Http } from '@angular/http';
@IonicPage({
   defaultHistory: ['browser']
})
@Component({
  selector: 'page-anadir',
  templateUrl: 'anadir.html',
})
export class AnadirPage {
  slideOneForm: FormGroup;
  imgPreview: string;
  browser:HomePage;
  constructor(public socialSharing: SocialSharing,
              public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private imagePicker: ImagePicker,
              public http: Http,
              private authService: AuthService) {

    //Creacion del form y sus campos mediante formBuilder
      this.slideOneForm = formBuilder.group({
      firstName: [''],
      pais: [''],
      ciudad: [''],
      poblacion:[''],
      correo:[''],
      telefono:[''],
      lastName: [''],
      weight:[''],
      descripcion: [''],
      edad: ['']
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

//Funcion para volver a la pagina anterior
  goBack() {
    this.navCtrl.pop();
  }
  //Peticion post
  postRequest() {
   const url="http://127.0.0.1:8000/nuevo_animal"

   let body = {
     'animal_type':'1',
     'race':'1',
     'profile':'1',
     'state':'Adopcion',
     'name':'hafuncioncionado',
     'color':'marron',
     'genre':'Macho',
     'vaccinated':'True',
     'description':'Se ha perdido',
     'age':'1 año',
   };

   this.http.post(url, body, this.authService.getHeaders())
     .subscribe(data => {
       console.log(data);
     });
 }
}

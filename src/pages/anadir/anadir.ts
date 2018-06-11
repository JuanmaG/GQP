import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePicker,ImagePickerOptions} from '@ionic-native/image-picker';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AuthService } from '../../providers/auth0.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { HomePage } from '../home/home';
import { ToastService } from '../../providers/toast.service';
import { ModalService } from '../../providers/modal.service';

@IonicPage({
   defaultHistory: ['browser']
})
@Component({
  selector: 'page-anadir',
  templateUrl: 'anadir.html',
})
export class AnadirPage {

  form: FormGroup;
  loading: boolean = false;
  slideOneForm: FormGroup;
  imgPreview: string;
  browser:HomePage;
  raza:any;
  tipo:any;
  sexo:any;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(public socialSharing: SocialSharing,
              public navCtrl: NavController,
              public toastService: ToastService,
              public navParams: NavParams,
              private modalService: ModalService,
              public formBuilder: FormBuilder,
              private imagePicker: ImagePicker,
              public http: Http,
              private authService: AuthService) {

      this.createForm()
    //Creacion del form y sus campos mediante formBuilder

  }
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.slideOneForm.get('imagen').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
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

  createForm() {
    this.slideOneForm = this.formBuilder.group({
      nombre: ['',Validators.required],
      color:[''],
      vacc:['',Validators.required],
      weight:['',Validators.required],
      descripcion: [''],
      age: ['',Validators.required],
      imagen:null
    });
  }

  onSubmit() {
    this.modalService.showLoading('Añadiendo tu anuncio...');
    const formModel = this.slideOneForm.value;
    this.loading = true;
    console.log('1');
    this.postRequest()
    .then((response: any) => {
      this.modalService.hideLoading();
      this.loading = false;
      this.toastService.show('Se le ha enviado un email para activar su cuenta.');
      this.navCtrl.setRoot(HomePage); // Redirigimos a la página del listado donde pueda ver que el anuncio acaba de subirse.
    }, (error) => {
      this.modalService.hideLoading();
      this.loading = false;
      console.log(formModel);
      this.toastService.show('Ha habido algún error en el registro. Revise los campos introducidos.');
    });
  }

  //Funcion para volver a la pagina anterior
  goBack() {
    console.log(this.raza);
    this.navCtrl.pop();
  }

  //Peticion post
  postRequest() {
    const url="http://127.0.0.1:8000/nuevo_animal"

    let body = {
      'animal_type':'1',
      'race':this.raza,
      'profile':'1',
      'state':this.tipo,
      'name':this.slideOneForm.controls['nombre'].value,
      'color':this.slideOneForm.controls['color'].value,
      'genre':this.sexo,
      'vaccinated':this.slideOneForm.controls['vacc'].value,
      'description':this.slideOneForm.controls['descripcion'].value,
      'age':this.slideOneForm.controls['age'].value,
      'image':this.slideOneForm.controls['imagen'].value
    };

    return this.http.post(url, body, this.authService.getHeaders())
      .toPromise()
      .then(
        (response) => {
          return Promise.resolve('ok');
        },
        (error) => {
          return Promise.reject(error);
        }
      );
  }
}

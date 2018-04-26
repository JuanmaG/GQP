import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImagePicker,ImagePickerOptions } from '@ionic-native/image-picker';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import { DataFinder } from '../../assets/providers/datafinder';

@IonicPage()
@Component({
  selector: 'page-editar',
  templateUrl: 'editar.html',
})
export class EditarPage {

  slideOneForm: FormGroup;
  imgPreview: string;
  perro:any={};
  public nameRaceSelected: any = null;
  public nameGenreSelected: any = null;
  browser:HomePage;
  races=[];
  genres=[];
  // TODO: Eliminar este listado de aquí y meterlo en un json de configuración

  constructor(public socialSharing: SocialSharing,
              public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private imagePicker: ImagePicker,
              public http: Http,
              private dataFinder:DataFinder) {

    this.perro=this.navParams.get("perro");

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
    this.nameRaceSelected = this.perro.race;
    this.nameGenreSelected = this.perro.genre;
  }
  ionViewDidLoad() {
    this.dataFinder.getJSONDataAsync("./assets/data/races.json").then(data => {
      this.SetQueryOptionsData(data);
    });
  }

  /* Sets data with returned JSON array */
  SetQueryOptionsData(data : any) {
    this.races = data.races;
    this.genres = data.genres;
  }
  updateRace() {
    console.log('actualizamos raza del perro');
  }

  updateGenre(){
    console.log('acutalizacion genero Perro');
  }

  seleccionarFoto() {
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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePicker,ImagePickerOptions} from '@ionic-native/image-picker';
@IonicPage()
@Component({
  selector: 'page-anadir',
  templateUrl: 'anadir.html',
})
export class AnadirPage {
  slideOneForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private imagePicker: ImagePicker) {
    this.slideOneForm = formBuilder.group({
    firstName: [''],
    lastName: [''],
    age: ['']
});
}
seleccionarFoto(){
  let options:ImagePickerOptions = {
    quality:70,
    outputType: 1,
    maximumImagesCount: 1
  }
  this.imagePicker.getPictures(options).then((results) => {
    for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
    }
  }, (err) => {
    console.log("ERROR en la imagen");
  });
}
}

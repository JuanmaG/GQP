import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnadirPage } from './anadir';
import { ImagePicker } from '@ionic-native/image-picker';
@NgModule({
  declarations: [
    AnadirPage,
  ],
  imports: [
    IonicPageModule.forChild(AnadirPage),
  ],
})
export class AnadirPageModule {}

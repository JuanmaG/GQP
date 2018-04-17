import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarPage} from './editar';
import { ImagePicker } from '@ionic-native/image-picker';
@NgModule({
  declarations: [
    EditarPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarPage),
  ],
})
export class EditarPageModule {
}

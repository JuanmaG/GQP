import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VistaPage } from './vista';
import { EditarPage} from '../editar/editar';
@NgModule({
  declarations: [
    VistaPage,
  ],
  imports: [
    IonicPageModule.forChild(VistaPage),
  ],
})
export class VistaPageModule {}

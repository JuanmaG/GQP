import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisanunciosPage } from './misanuncios';

@NgModule({
  declarations: [
    MisanunciosPage,
  ],
  imports: [
    IonicPageModule.forChild(MisanunciosPage),
  ],
})
export class MisanunciosPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdoptedsPage } from './adopteds';

@NgModule({
  declarations: [
    AdoptedsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdoptedsPage),
  ],
})
export class AdoptedsPageModule {}

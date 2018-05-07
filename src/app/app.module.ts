import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ImagePicker } from '@ionic-native/image-picker';
import { MyApp } from './app.component';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HomePage } from '../pages/home/home';

import {VistaPage,AnadirPage,LoginPage,EditarPage,ConfigurationPage,MisanunciosPage,AdoptedsPage,
LostPage,FoundPage} from "../pages/index.paginas"

import { HttpModule } from '@angular/http';
import { Facebook } from '@ionic-native/facebook';
import {PerrosService} from "../providers/perros";
import {LostedsService} from "../providers/losteds";
import {FindedsService} from "../providers/findeds";
import {DataFinder} from "../assets/providers/datafinder";
import { SuperTabsModule,SuperTabsController } from 'ionic2-super-tabs';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AdoptedsPage,
    FoundPage,
    LostPage,
    VistaPage,
    AnadirPage,
    LoginPage,
    EditarPage,
    ConfigurationPage,
    MisanunciosPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AdoptedsPage,
    LostPage,
    FoundPage,
    VistaPage,
    AnadirPage,
    LoginPage,
    EditarPage,
    ConfigurationPage,
    MisanunciosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    SocialSharing,
    Facebook,
    PerrosService,
    FindedsService,
    LostedsService,
    DataFinder,
    SuperTabsController,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ImagePicker } from '@ionic-native/image-picker';
import { MyApp } from './app.component';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HomePage } from '../pages/home/home';
import { EmailComposer } from '@ionic-native/email-composer';


import {VistaPage,AnadirPage,LoginPage,EditarPage,ConfigurationPage,MisanunciosPage,AdoptedsPage,
LostPage,FoundPage,RegistroPage} from "../pages/index.paginas"

import { HttpModule } from '@angular/http';
import { Facebook } from '@ionic-native/facebook';

import { ModalService } from '../providers/modal.service';
import { ToastService } from '../providers/toast.service';
import { AlertService } from '../providers/alert.service';
import {PerrosService} from "../providers/perros";
import {FiltersService} from "../providers/filters";
import {LostedsService} from "../providers/losteds";
import {FindedsService} from "../providers/findeds";
import {DetailService} from "../providers/userdetails";

import { AuthService } from '../providers/auth0.service';

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
    RegistroPage,
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
    RegistroPage,
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
    AlertService,
    ToastService,
    ModalService,
    PerrosService,
    DetailService,
    FindedsService,
    LostedsService,
    FiltersService,
    AuthService,
    DataFinder,
    SuperTabsController,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

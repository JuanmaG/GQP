import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ImagePicker } from '@ionic-native/image-picker';
import { MyApp } from './app.component';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';
import { HomePage } from '../pages/home/home';
import {VistaPage,AnadirPage,LoginPage,EditarPage,ConfigurationPage,MisanunciosPage} from "../pages/index.paginas"
import { HttpModule } from '@angular/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import {PerrosService} from "../providers/perros";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
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
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
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
    Screenshot,
    Facebook,
    PerrosService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

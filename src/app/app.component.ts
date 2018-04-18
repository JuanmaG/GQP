import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {VistaPage,AnadirPage,LoginPage,ConfigurationPage,MisanunciosPage} from "../pages/index.paginas"
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  browser=HomePage;
  anadir=AnadirPage;
  login=LoginPage;
  misanuncios=MisanunciosPage;
  configuration=ConfigurationPage;
  public buttonClicked: boolean = false;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrirPagina(pagina:any) {
    this.nav.push(pagina);
  }

public onButtonClick() {
    this.buttonClicked = !this.buttonClicked;
}

}

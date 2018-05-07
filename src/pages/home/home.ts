import { Component } from '@angular/core';
import { NavController,NavParams,MenuController } from 'ionic-angular';
import {AdoptedsPage,LostPage,FoundPage} from "../index.paginas";
import { Http } from '@angular/http';
import {PerrosService}from "../../providers/perros";
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';
  @Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //Declaraciones
  story=false;
  newperros:any[]=[];
  page1: any = AdoptedsPage;
  page2: any = LostPage;
  page3: any = FoundPage;

  constructor(public navCtrl:NavController,
    public navParams: NavParams,
    public http: Http,
    public menuCtrl:MenuController,
    private _ps:PerrosService,
    public loadingController:LoadingController,
    private superTabsCtrl: SuperTabsController) {
  }

  /*ngAfterViewInit() {
    // must wait for AfterViewInit if you want to modify the tabs instantly
    this.superTabsCtrl.setBadge('homeTab', 5);
  }*/

  hideToolbar() {
    this.superTabsCtrl.showToolbar(false);
  }

  showToolbar() {
    this.superTabsCtrl.showToolbar(true);
  }

  onTabSelect(ev: any) {
    console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
  }

}

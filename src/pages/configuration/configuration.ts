import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataFinder } from '../../assets/providers/datafinder';

@IonicPage()
@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {
  races=[];
  public nameRaceSelected: any = null;
  public nameGenreSelected: any = null;
  genres=[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dataFinder:DataFinder,) {

  }
  ionViewDidLoad(){
      this.dataFinder.getJSONDataAsync("./assets/data/races.json").then(data => {
      this.SetQueryOptionsData(data);
  });}

  /* Sets data with returned JSON array */
  SetQueryOptionsData(data : any) {
    this.races = data.races;
    this.genres = data.genres;
  }

  updateRace() {
    console.log('actualizamos raza del perro');
  }
  goBack() {
    this.navCtrl.pop();
  }

}

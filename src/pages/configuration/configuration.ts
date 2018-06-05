import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataFinder } from '../../assets/providers/datafinder';
import { FiltersService } from '../../providers/filters';

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
              private dataFinder:DataFinder,
              public filters:FiltersService) {

  }
  ionViewDidLoad(){
      this.dataFinder.getJSONDataAsync("./assets/data/races.json").then(data => {
      this.SetQueryOptionsData(data);
  });}
  applyFilter(data,extra){
    console.log(data,extra)
    if(data=='sexo'){

      if(extra=='nofilter'){
              this.filters.sexfilter=false;
            }
      if(extra!='nofilter'){
              this.filters.sexfilter=true;
              this.filters.type=extra;
      }
    }
    
    if(data=='raza'){
      if(extra=='nofilter'){
        this.filters.racefilter=false;
      }
      else if(extra!='nofilter'){
        this.filters.racefilter=true;
        this.filters.specifie=extra;
      }
    }

    if(data=='vacc'){
      if(this.filters.vaccfilter==false){
        this.filters.vaccfilter=true;
      }
      else if(this.filters.vaccfilter==true){
        this.filters.vaccfilter=false;

    }
    else if(data=='vacc' && this.filters.vaccfilter==true){
      this.filters.vaccfilter=false;
      console.log('3')
    }
  }
}
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

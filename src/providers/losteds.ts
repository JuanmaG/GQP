import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class LostedsService{
  perros:any[]=[];
    constructor(public http: Http,public loadingController: LoadingController){
      let loader = this.loadingController.create({
            content: "Loading please wait"
          });
      loader.present();
      this.http.get("http://guauqueanimales.com/dogs/losteds/")
                .map( resp => resp.json() )
                .subscribe( data=>{
                  console.log(data);
                  if(data.error){

                  }else{
                    this.perros.push(...data);

                  }
                });
loader.dismiss();
}

    }

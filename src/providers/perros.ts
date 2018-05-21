import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AuthService } from '../providers/auth0.service';
@Injectable()
export class PerrosService{
  perros:any[]=[];
    constructor(public http: Http,
                public loadingController: LoadingController,
                private authService: AuthService){

      let loader = this.loadingController.create({
            content: "Loading please wait"
          });
      loader.present();
	    this.http.get("http://127.0.0.1:8000/animal/", this.authService.getHeaders())
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

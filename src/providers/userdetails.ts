import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AuthService } from '../providers/auth0.service';
@Injectable()
export class DetailService{
    id:string;
    constructor(public http: Http,
                public loadingController: LoadingController,
                private authService: AuthService){

}
load(){
  let loader = this.loadingController.create({
        content: "Loading please wait"
      });
  loader.present();
  this.http.get("http://127.0.0.1:8000/user/", this.authService.getHeaders())
             .map( resp => resp.json() )
             .subscribe( data=>{
               console.log(data);
               if(data.error){
                 console.log(data.perro)
                 this.id=data['0']
               }else{
                 this.id=data[0].id;
                 console.log(this.id)
               }
             });
             loader.dismiss();
           }
}

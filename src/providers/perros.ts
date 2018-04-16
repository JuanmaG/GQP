import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PerrosService{
  perros:any[]=[];
    constructor(public http: Http){
      this.http.get("http://guauqueanimales.com/dogs/adopteds/")
                .map( resp => resp.json() )
                .subscribe( data=>{
                  console.log(data);
                  if(data.error){

                  }else{
                    this.perros.push(...data);

                  }
                });
    }
}

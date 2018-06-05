import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class FiltersService{
  public sexfilter:boolean=false;
  public racefilter:boolean=false;
  public vaccfilter:boolean=false;
  public type:string;
  public specifie:string;
    constructor(public http: Http,public loadingController: LoadingController){}

    }

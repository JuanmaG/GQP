  import { Component } from '@angular/core';
  import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
  import { FormBuilder, FormGroup } from '@angular/forms';
  import { HomePage } from '../home/home';
  import { Http, Headers, RequestOptions } from '@angular/http';
  import { ToastController } from 'ionic-angular';
  import { Facebook } from '@ionic-native/facebook';
  import { AuthService } from '../../providers/auth0.service';
  @IonicPage()
  @Component({
    selector: 'page-login',
    templateUrl: 'login.html',
  })
  export class LoginPage {
    browser=HomePage;
    slideOneForm: FormGroup;
    isLoggedIn:boolean = false;
    users: any;
    public authenticated = false;

    constructor(private fb: Facebook,
                private toastCtrl: ToastController,
                public navCtrl: NavController,
                public navParams: NavParams,
                public formBuilder: FormBuilder,
                public http: Http,
                private authService: AuthService,
                private menu: MenuController) {
                  this.slideOneForm = this.formBuilder.group({
                  firstName: [''],
                  lastName:[''],
                  age: ['']
              });

    //Para comprobar si se esta logeado
    fb.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if(res.status === "connect") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));
    }

    public ionViewDidLoad(){
      this.menu.swipeEnable(false);
    }

    public presentToast() {
      let toast = this.toastCtrl.create({
        message: 'Work In Progress',
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    }
    //Funcion para abrir pagina
    public abrirPagina(pagina:any){
      this.navCtrl.push(pagina);
    }

    //Funcion de logout para el plugin de facebook
  /*  public logout() {
      this.fb.logout()
        .then( res => this.isLoggedIn = false)
        .catch(e => console.log('Error logout from Facebook', e));
    }*/

    //Funcion de login con el plugin de facebook
    public login() {
      this.fb.login(['public_profile', 'user_friends', 'email'])
        .then(res => {
          if(res.status === "connected") {
            this.isLoggedIn = true;
            this.getUserDetail(res.authResponse.userID);
          } else {
            this.isLoggedIn = false;
          }
        })
        .catch(e => console.log('Error logging into Facebook', e));
    }

    //Funcion de login
    public genLogin(){
      console.log(this.authService.authenticated);
      this.authService.authenticate(this.slideOneForm.controls['firstName'].value,this.slideOneForm.controls['lastName'].value);
      if(this.authService.authenticated){
        console.log(this.authService.authenticated);
        this.abrirPagina(this.browser);
        this.menu.swipeEnable(true);
      }
    }
    //Funcion para conseguir datos del usuario logado
    private getUserDetail(userid) {
      this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
        .then(res => {
          console.log(res);
          this.users = res;
        })
        .catch(e => {
          console.log(e);
        });
    }

    registRequest() {
       const url="http://127.0.0.1:8000/registro"

       let body = {
         'username':'pruebaso',
         'password':'123',
         'email':'sdaasfa@gmail.com',
         'first_name':'prueba',
         'last_name':'prueba',
         'city':'1'
       };

       this.http.post(url, body)
         .subscribe(data => {
           console.log(data);
         });
     }



}

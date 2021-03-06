import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ToastService } from '../../providers/toast.service';
import { ModalService } from '../../providers/modal.service';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  loading: boolean = false;
  slideOneForm: FormGroup;
  ciudades:any[]=[];
  cities:any[]=[];
  public nameCiudadSelected: any = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http:Http,
              private modalService: ModalService,
              public formBuilder: FormBuilder,
              public toastService: ToastService) {
                this.createForm();
                this.cargarCiudades();
                console.log(this.cities);
  }
    createForm() {
      this.slideOneForm = this.formBuilder.group({
        username: ['',Validators.required],
        password:[''],
        email:['',Validators.required],
        firstname:['',Validators.required],
        confirmation: [''],
        lastname: ['',Validators.required],
        city: ['',Validators.required]
      });
    }
    //Request para el registro
    postRequest() {
         const url="http://127.0.0.1:8000/registro"

         let body = {
           'username':this.slideOneForm.controls['username'].value,
           'password':this.slideOneForm.controls['password'].value,
           'email':this.slideOneForm.controls['email'].value,
           'first_name':this.slideOneForm.controls['firstname'].value,
           'last_name':this.slideOneForm.controls['lastname'].value,
           'city':this.slideOneForm.controls['city'].value
         };

         return this.http.post(url, body)
         .toPromise()
          .then(
           (response) => {
             return Promise.resolve('ok');
           },
           (error) => {
             return Promise.reject(error);
           }
       );
     }

     //Funcion de confirmacion de contraseña
     checkFields(){
       if(this.slideOneForm.controls['password'].value == this.slideOneForm.controls['confirmation'].value){
         return true
       }
       else{
        return false;
       }
     }
     cargarCiudades(){
     this.http.get("http://127.0.0.1:8000/ciudades")
                 .map( resp => resp.json() )
                 .subscribe( data=>{
                   console.log(data);
                   if(data.error){
                   }else{
                     this.ciudades.push(...data);

                   }})
     }

     updateCiudad() {
       console.log('actualizamos ciudad');
     }
     //Funcion coordinadora lanzada para hacer el registro
     onSubmit() {
       this.modalService.showLoading('Registrando usuario...');
       this.checkFields()
       if(this.checkFields()){
       const formModel = this.slideOneForm.value;
       this.loading = true;
       this.postRequest()
       .then((response: any) => {
         this.modalService.hideLoading();
         this.loading = false;
         this.navCtrl.pop();
         this.toastService.show('Se le ha enviado un email para activar su cuenta.');
       }, (error) => {
         this.modalService.hideLoading();
         this.loading = false;
         if(error.status === 409){
           this.toastService.show('Nombre de usuario en uso, vuelva a intetarlo');
         }
       })}
       else{
         this.toastService.show('Las contraseñas no coinciden');
         this.modalService.hideLoading();
       };
     }
     //Funcion para volver a la pagina anterior
     goBack() {

       this.navCtrl.pop();
     }
}

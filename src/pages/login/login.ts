import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { CrudService } from "../../services/CrudService";
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  form;

  constructor(public nav: NavController, public forgotCtrl: AlertController, private storage :Storage,
     public menu: MenuController, public toastCtrl: ToastController, private crudService: CrudService) {
    this.menu.swipeEnable(false);

    this.form = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    });
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
   // 
   this.nav.setRoot(HomePage);
   this.crudService.saveData('citizens/login',this.form.value,0)
   .subscribe((e:any)=>{
     console.log(e);
     if(e.code !=0){
       this.crudService.toast('Invalid username or password');
       this.storage.set("uid",e.id);
       this.storage.set("email",e.email);
       
       
     }else{
      this.nav.setRoot(HomePage);
     }
   })
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sent successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}

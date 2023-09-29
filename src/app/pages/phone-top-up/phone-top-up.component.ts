import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { PhoneTopUpService } from 'src/app/services/phone-top-up.service';

@Component({
  selector: 'app-phone-top-up',
  templateUrl: './phone-top-up.component.html',
  styleUrls: ['./phone-top-up.component.css']
})
export class PhoneTopUpComponent implements OnInit {

  phoneTopUpForm = this.fb.group({    
    phoneNumber: ['', {validators: [Validators.min(10), Validators.required]}],
    amount: ['', {validators: Validators.required}],
    phoneServiceProvider: ['', {validators: Validators.required}]
  })

  phoneError = '';

  constructor(private phoneSrv: PhoneTopUpService,
     protected fb: FormBuilder,
     private router: Router)
   { 

   }
   icona: string = "";
   ngOnInit(){    
    this.icona = '../../../assets/images/internet.svg';
   }

  /*  switch (phoneServiceProvider) {
    case phoneServiceProvider:
      
      break;
   
    default:
      break;
   } */
   
   
   phoneTopUp(){
    if(this.phoneTopUpForm.valid){
      const { phoneNumber, amount, phoneServiceProvider } = this.phoneTopUpForm.value; 
      const numberAmount = parseFloat(amount!);
      this.phoneSrv.phoneTopUp(phoneNumber!, numberAmount, phoneServiceProvider!)
      .pipe(
        catchError(err => {
          this.phoneError = err.error.message;
          return throwError(() => err);   
        })
      )
      .subscribe(() => {
        this.router.navigate(['menu-actions'])
      });
    }
    else{
      console.log(this.phoneTopUpForm.value.phoneNumber)
      if( this.phoneTopUpForm.value.phoneNumber == "" || this.phoneTopUpForm.value.phoneNumber!.length < 10){
        if(this.phoneTopUpForm.value.amount == "" && (this.phoneTopUpForm.value.phoneNumber == "" || this.phoneTopUpForm.value.phoneNumber!.length < 10)){
          if(this.phoneTopUpForm.value.phoneServiceProvider == "" && this.phoneTopUpForm.value.amount == "" && (this.phoneTopUpForm.value.phoneNumber == "" || this.phoneTopUpForm.value.phoneNumber!.length < 10)){
            this.phoneError = "Numero di telefono, importo ed operatore non validi";
          }
          else{
          this.phoneError = "Numero di telefono ed importo non validi";
        }
          }else{
            if(this.phoneTopUpForm.value.phoneServiceProvider == "" && (this.phoneTopUpForm.value.phoneNumber == "" || this.phoneTopUpForm.value.phoneNumber!.length < 10)){
              this.phoneError = "Numero di telefono ed operatore non validi";
            }
            else{
              this.phoneError = "Numero di telefono non valido";
            }
          }
      }
      else{
        if(this.phoneTopUpForm.value.amount == ""){          
          if(this.phoneTopUpForm.value.amount == "" && this.phoneTopUpForm.value.phoneServiceProvider == ""){            
            this.phoneError = "Importo ed operatore non validi";            
            }
            else{
          this.phoneError = "Importo non valido";
            }
          }
          else{
            if(this.phoneTopUpForm.value.phoneServiceProvider == ""){
              this.phoneError = "Operatore non valido";
              }
          }
      } 
      console.log("errore, transazione fallita");
    }
  }
 
   updateIcon(event: any) {
    const phoneServiceProvider = event.target.value;

    switch (phoneServiceProvider) {
      case 'Tim':
        this.icona = '../../../assets/images/tim-2016.svg';
        break;
      case 'Vodafone':
        this.icona = '../../../assets/images/Vodafone_2017_logo.svg';
        break;
      case 'WindTre':
        this.icona = '../../../assets/images/windtre-logo.svg';
        break;
      case 'Iliad':
        this.icona = './../../assets/images/iliad-logo.svg';
        break;
      case 'PosteMobile':
        this.icona = '../../../assets/images/PosteMobile_logo_(2018).svg';
        break;
      case 'Fastweb Mobile':
        this.icona = '../../../assets/images/fastweb-logo.svg';
        break;
      case 'Ho.':
        this.icona = '../../../assets/images/ho-logo.svg';
        break;
      case 'Tiscali':
        this.icona = '../../../assets/images/tiscali-logo.svg';
        break;
      case 'Very Mobile':
        this.icona = '../../../assets/images/very-mobile-logo.svg';
        break;
      case 'Kena':
        this.icona = '../../../assets/images/kena-logo.svg';
        break;
      case 'Spusu':
        this.icona = '../../../assets/images/spusu-logo.svg';
        break;
        case '':
          this.icona = '../../../assets/images/internet.svg';
          break;
      default:
        this.icona = '../../../assets/images/internet.svg';
        break;
    }
  }





}

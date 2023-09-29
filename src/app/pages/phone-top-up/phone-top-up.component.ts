import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  phoneTopUpError = "";

  constructor(private phoneSrv: PhoneTopUpService,
     protected fb: FormBuilder)
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
    }
    else{
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

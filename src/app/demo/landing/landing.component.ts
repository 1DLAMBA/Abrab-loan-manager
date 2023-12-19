import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
NgxSpinnerService

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent{
  landing:boolean=true;
  about:boolean=false;
  constructor(private router: Router,
    private spinner:NgxSpinnerService){

  }
  switchtoabout(){
    this.spinner.show();
    this.about=true;
    this.landing=false;
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }
  switchtolanding(){
    this.spinner.show();

    this.landing=true;
    this.about=false;
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }
  proceed(){
    this.router.navigate(['guest-login'])
  }
  login(){
    this.router.navigate(['guest-login'])
  }
  signup(){
    this.router.navigate(['guest-signup'])
  }
  


}

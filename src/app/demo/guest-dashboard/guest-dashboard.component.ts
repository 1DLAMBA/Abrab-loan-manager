import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,
  ActivatedRouteSnapshot,
  Route, } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
  import { environment } from '../environment';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-guest-dashboard',
  templateUrl: './guest-dashboard.component.html',
  styleUrls: ['./guest-dashboard.component.scss']
})
export class GuestDashboardComponent implements OnInit{
  AccountForm: FormGroup;
  title = 'Abrab';
  id: string;
  user: any;
  loan: any;
  avatar_file: string;
  acceptance:boolean=false;
  application:boolean=true;


  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private route: ActivatedRoute,
    private _http:HttpClient,
    private spinner: NgxSpinnerService
  ){
    this.AccountForm = this.fb.group({
      bank: this.fb.control('', [Validators.required]),
      account_number: this.fb.control('', [Validators.required]),
      account_name: this.fb.control('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    console.log(this.id)
    this.getuser();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }
closeacceptance(){
  this.acceptance=false;
  this.application= true

}
showacceptance(){
  this.acceptance=true;
  this.application= false

}
login(){
  this.router.navigate(['guest-login'])
}
signup(){
  this.router.navigate(['guest-signup'])
}

print(){
  window.print()
}
  accountform(){
    const formData={
      bank: this.AccountForm.value.bank,
      account_number: this.AccountForm.value.account_number,
      account_name: this.AccountForm.value.account_name,
    }
    this._http.post(`${environment.baseUrl}/user/account/${this.user.id}`, formData)
    .subscribe((response: any)=>{
      location.reload();
      console.log(response);
      
    })
    console.log(formData)

  }
    getuser(){
    this._http.get(`${environment.baseUrl}/user/get/${this.id}`)
    .subscribe((response:any)=>{
      console.log(response);
      this.user = response.user;
      this.avatar_file = environment.baseUrl + '/file/get/';
     
      console.log(this.user.loans[0].loan_amount)
    })
  }

  proceed(){
    if(this.user.has_loan){
      window.alert('You have a loan already')
      return;
    }
    this.router.navigate([`/guest-loan/${this.id}`])
  }

}

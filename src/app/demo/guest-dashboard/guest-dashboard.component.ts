import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,
  ActivatedRouteSnapshot,
  Route, } from '@angular/router';
 
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


  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private route: ActivatedRoute,
    private _http:HttpClient,
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
  }

  accountform(){
    const formData={
      bank: this.AccountForm.value.bank,
      account_number: this.AccountForm.value.account_number,
      account_name: this.AccountForm.value.account_name,
    }
    this._http.post(`${environment.baseUrl}/user/account/${this.user.id}`, formData)
    .subscribe((response: any)=>{
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

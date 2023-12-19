import { Component, inject, OnDestroy, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute,
  ActivatedRouteSnapshot,
  Route, } from '@angular/router';
import { ToastService } from 'src/app/demo/toast.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/demo/environment';
import { AuthenticationModule } from '../authentication.module';


  

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, AuthenticationModule],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss'],
})
export default class AuthSignupComponent {
RegistrationForm: FormGroup;
toastService = inject(ToastService);

constructor(
  private readonly fb: FormBuilder,
  private readonly router: Router,
  private route: ActivatedRoute,
  private _http:HttpClient,

){
  this.RegistrationForm = this.fb.group({
   name: this.fb.control('', [Validators.required]),
  email: this.fb.control('', [Validators.required]),
  password: this.fb.control('', [Validators.required]),
  confirm_password: this.fb.control('', [Validators.required]),
  })
}

submit(){
  const formData= {
    name: this.RegistrationForm.value.name,
    email: this.RegistrationForm.value.email,
    password: this.RegistrationForm.value.password,
}
this._http.post(`${environment.baseUrl}/admin/register`, formData)
.subscribe({
  next: (response) => {
    
    // this.showSuccess($success)
    this.router.navigate(['auth/signin']);
     
  },
  error: (res) => {
    window.alert('Your Email is already registered')
    console.log('User Exists')
  }  
});


}
}

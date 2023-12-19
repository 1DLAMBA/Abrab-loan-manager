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
  selector: 'app-auth-signin',
  standalone: true,
  imports: [CommonModule, RouterModule, AuthenticationModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
})
export default class AuthSigninComponent {
  LoginForm: FormGroup;
toastService = inject(ToastService);

constructor(
  private readonly fb: FormBuilder,
  private readonly router: Router,
  private route: ActivatedRoute,
  private _http:HttpClient,

){
  this.LoginForm = this.fb.group({
  email: this.fb.control('', [Validators.required]),
  password: this.fb.control('', [Validators.required]),
  })
}

submit(){
  const formData= {
    email: this.LoginForm.value.email,
    password: this.LoginForm.value.password,
}
this._http.post(`${environment.baseUrl}/admin/login`, formData)
.subscribe({
  next: (response) => {
    
    // this.showSuccess($success)
    this.router.navigate(['admin']);
     
  },
  error: (res) => {
    window.alert('Invalid Credentials')
    console.log('User Exists')
  }  
});


}
}

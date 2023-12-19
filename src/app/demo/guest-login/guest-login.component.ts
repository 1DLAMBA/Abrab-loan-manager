import { Component, inject, OnDestroy, TemplateRef, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute,
  ActivatedRouteSnapshot,
  Route, } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

  import { ToastService } from '../toast.service';
 import { ToastsContainer } from '../toasts-container.components';
  import { environment } from '../environment';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-guest-login',
  templateUrl: './guest-login.component.html',
  styleUrls: ['./guest-login.component.scss'],
 
  providers: [MessageService]
})
export class GuestLoginComponent implements OnInit{
  toastService = inject(ToastService);
LoginForm: FormGroup;
phase1:boolean=true;
phase2:boolean = false;
phase3: boolean = false;
ngOnInit() {
  this.spinner.show();
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 5000);
}
constructor(
  private readonly fb: FormBuilder,
  private readonly router: Router,
  private route: ActivatedRoute,
  private _http:HttpClient,
  private messageService: MessageService,
  private spinner: NgxSpinnerService
){
  this.LoginForm = this.fb.group({
    email: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  })
}


showSuccess() {
  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
}

showInfo() {
  this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
}

showWarn() {
  this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
}

showError() {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
}



showStandard(template: TemplateRef<any>) {
  this.toastService.show({ template,  message:'' });
}

// showSuccess(template: TemplateRef<any>, message: string = 'Default success message') {
//   this.toastService.show({ template, classname: 'bg-success text-light', delay: 5000, message:message });
//   console.log('clicked')
// }

showDanger(template: TemplateRef<any>, message: string = 'Default success message') {
  this.toastService.show({ template, classname: 'bg-danger text-light', delay: 15000,  message:message });
}

ngOnDestroy(): void {
  this.toastService.clear();
}

submit(){
  this.spinner.show();
  const formData = {
    email: this.LoginForm.value.email,
    password: this.LoginForm.value.password,
  }
  if(this.LoginForm.invalid){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill form' });

    return;
  }
  
  this._http.post(`${environment.baseUrl}/user/login`, formData)
  .subscribe((response:any)=>{
    if(response.user){
      console.log(response);
      localStorage.setItem('id', response.user.id);
      
        /** spinner ends after 5 seconds */
        this.spinner.hide();
     
      this.router.navigate(['/guest-dashboard']);
      return;
    }
    this.spinner.hide();
  
    
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Details' });

  })
  
}


}

import { Component, inject, OnDestroy, TemplateRef} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute,
  ActivatedRouteSnapshot,
  Route, } from '@angular/router';
  import { MessageService } from 'primeng/api';
  import { environment } from '../environment';
  
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { ToastService } from '../toast.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-guest-signup',
  templateUrl: './guest-signup.component.html',
  styleUrls: ['./guest-signup.component.scss'],
  providers: [MessageService]
})
export class GuestSignupComponent {
RegistrationForm: FormGroup;
toastService = inject(ToastService);
successTpl:TemplateRef<any>;
phase1:boolean=true;
UI1:boolean=false;
phase2:boolean = false;
phase3: boolean = false;
loader: boolean = false;
img: boolean = true;
  uploadedIdentificationDocumentFile: any;
  uploadedAvatarFile: string;
  avatarFile: string;
  uploadedIdentificationDocumentFile1: any;
  uploadedIdentificationDocumentFile2: any;
  IdentificationDocumentFile1: any;
  IdentificationDocumentFile2: any;
  UI2: boolean;

  showStandard(template: TemplateRef<any>) {
		this.toastService.show({ template,  message:'' });
	}

	showSuccess(template: TemplateRef<any>, message: string = 'Default success message') {
		this.toastService.show({ template, classname: 'bg-success text-light', delay: 2500, message:message });
    
	}

	showDanger(template: TemplateRef<any>, message: string = 'Default success message') {
		this.toastService.show({ template, classname: 'bg-danger text-light', delay: 2500,  message:message });
	}

	ngOnDestroy(): void {
		this.toastService.clear();
	}
next1($danger){
  if(this.RegistrationForm.value.password != this.RegistrationForm.value.confirm_password){
    this.showDanger($danger)

    return;
  }
  this.phase1=false
  this.phase2=true;
}

constructor(
  private readonly fb: FormBuilder,
  private readonly router: Router,
  private route: ActivatedRoute,
  private _http:HttpClient,
  private messageService: MessageService,
  private spinner: NgxSpinnerService
){
this.RegistrationForm = this.fb.group({
  name: this.fb.control('', [Validators.required]),
  email: this.fb.control('', [Validators.required]),
  phoneno: this.fb.control('', [Validators.required]),
  country: this.fb.control('', [Validators.required]),
  state: this.fb.control('', [Validators.required]),
  city: this.fb.control('', [Validators.required]),
  address: this.fb.control('', [Validators.required]),
  password: this.fb.control('', [Validators.required]),
  confirm_password: this.fb.control('', [Validators.required]),
  identification_type: this.fb.control('', [Validators.required]),
  identification_number1: this.fb.control('', [Validators.required]),
  identification_type2: this.fb.control('', [Validators.required]),
  identification_number2: this.fb.control('', [Validators.required]),
  employer_no: this.fb.control('', [Validators.required]),
  
})
}

submit($success, $danger){
  this.spinner.show();

  if(this.RegistrationForm.invalid){
  this.spinner.hide();

    this.showDanger($danger);
  }
  
  const baseUrlLength = (environment.baseUrl + '/file/get/').length;
  this.avatarFile = this.uploadedAvatarFile.slice(
    baseUrlLength,
    this.uploadedAvatarFile.length
  );
  this.IdentificationDocumentFile1 = this.uploadedIdentificationDocumentFile1.slice(
    baseUrlLength,
    this.uploadedIdentificationDocumentFile1.length
  );
  this.IdentificationDocumentFile2 = this.uploadedIdentificationDocumentFile2.slice(
    baseUrlLength,
    this.uploadedIdentificationDocumentFile2.length
  );
  const formData= {
    name: this.RegistrationForm.value.name,
    email: this.RegistrationForm.value.email,
    phoneno: this.RegistrationForm.value.phoneno,
    country: this.RegistrationForm.value.country,
    state: this.RegistrationForm.value.state,
    city: this.RegistrationForm.value.city,
    address: this.RegistrationForm.value.address,
    password: this.RegistrationForm.value.password,
    identification_type: this.RegistrationForm.value.identification_type,
    identification_number1: this.RegistrationForm.value.identification_number1,
    identification_file1: this.IdentificationDocumentFile1,
    identification_type2: this.RegistrationForm.value.identification_type2,
    identification_number2: this.RegistrationForm.value.identification_number2,
    identification_file2: this.IdentificationDocumentFile2,
    employer_phoneno: this.RegistrationForm.value.employer_no,
    passport: this.avatarFile

  }
    this._http.post(`${environment.baseUrl}/user/register`, formData)
    .subscribe({
      next: (response) => {
  this.spinner.hide();
        
        this.showSuccess($success)
        this.router.navigate(['/guest-login']);
         
      },
      error: (res) => {
        window.alert('Your Email is already registered')
        console.log('User Exists')
      }  
});
}

handleFileUpload(e: any, type: string, $danger, $success) {
  this.loader=true;
  this.img = false;
  let file = e.target.files[0];
  const formData: FormData = new FormData();
  formData.append('file', file, file.name);
  formData.append('visibility', 'public');
  switch (type) {
    case 'identification_file1':
      // Code specific to the "identification card" file type for individuals
      this.UI1=true;
      break;
      case 'identification_file2':
      // Code specific to the "identification card" file type for individuals
      this.UI2=true;
      break;
  }
  this._http.post(`${environment.baseUrl}/upload`,formData).subscribe({
    next: (res: any) => {
      const file = res.data;
      switch (type) {
        case 'identification_file1':
          // Code specific to the "identification card" file type for individuals
          this.IdentificationDocumentFile1 = file;
          break;
        case 'identification_file2':
          // Code specific to the "identification card" file type for individuals
          this.IdentificationDocumentFile2 = file;
          break;
        case 'avatar':
          // Code specific to the "avatar" file type for individuals
          this.avatarFile = file;
          break;
        default:
          // Handle any other file type for individuals as needed
          break;
      }
    },
    complete: () => {
      
      // Reset the loading flag after upload is complete
      switch (type) {
        case 'identification_file1':
          this.showSuccess($success)
          this.UI1=false;

          // Code specific to the "identification card" file type for individuals
      
          this.uploadedIdentificationDocumentFile1 =environment.baseUrl + '/file/get/' + this.IdentificationDocumentFile1 ;
          break;
          case 'identification_file2':
          this.showSuccess($success)
          this.UI2=false;

          // Code specific to the "identification card" file type for individuals
      
          this.uploadedIdentificationDocumentFile2 =environment.baseUrl + '/file/get/' + this.IdentificationDocumentFile2 ;
          break;
        case 'avatar':
          // Code specific to the "profile picture" file type for individuals
          this.uploadedAvatarFile = environment.baseUrl + '/file/get/' + this.avatarFile;
          this.showSuccess($success)
          this.loader=false;
          this.img = true;
          break;
        default:
          // Handle any other file type for individuals as needed
          break;
      }
    },
    error: (error) => {
      this.showDanger($danger)
      this.loader=false;
      this.UI2=false;
      this.UI1=false;

    },
  });
  
}
validateFile(fileName: string) {
  if (fileName) {
    const fileExtension = fileName.slice(-4);
    let file = '';
    switch (fileExtension) {
      case '.pdf':
        file = '';
        break;
      case '.doc':
      case 'docx':
        file = '';
        break;
      default:
        file = environment.baseUrl + '/file/get/' + fileName;
    }
    return file;
  }
  return '';
}
back(){
  this.phase2=false;
  this.phase1=true;
}
}

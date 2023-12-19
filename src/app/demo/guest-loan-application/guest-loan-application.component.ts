import { Component, inject, OnDestroy, TemplateRef} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute,
  ActivatedRouteSnapshot,
  Route, } from '@angular/router';
 import { ToastService } from '../toast.service';
 import { ToastsContainer } from '../toasts-container.components';
  import { environment } from '../environment';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
  

@Component({
  selector: 'app-guest-loan-application',
  templateUrl: './guest-loan-application.component.html',
  styleUrls: ['./guest-loan-application.component.scss']
})
export class GuestLoanApplicationComponent {
  toastService = inject(ToastService);
LoanForm: FormGroup;
  loan1:boolean=true;
  UI1:boolean=false;
  UI2:boolean=false;
  UI3:boolean=false;
  UI4:boolean=false;
  loan2:boolean=false;
  successTpl:TemplateRef<any>;
  id:string = this.route.snapshot.params['id'];
  g1_IdentificationDocumentFile1: any;
  g1_IdentificationDocumentFile2: any;
  g2_IdentificationDocumentFile1: any;
  g2_IdentificationDocumentFile2: any;
  g1_uploadedIdentificationDocumentFile1: string;
  g1_uploadedIdentificationDocumentFile2: string;
  g2_uploadedIdentificationDocumentFile1: string;
  g2_uploadedIdentificationDocumentFile2: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private route: ActivatedRoute,
    private _http:HttpClient,
    private spinner: NgxSpinnerService
  ){
    this.LoanForm = this.fb.group({
      loan_amount: this.fb.control('', [Validators.required]),
      installment_period: this.fb.control('', [Validators.required]),
      guarantor1_name: this.fb.control('', [Validators.required]),
      guarantor1_phoneno: this.fb.control('', [Validators.required]),
      guarantor1_address: this.fb.control('', [Validators.required]),
      guarantor1_identification_type1: this.fb.control('', [Validators.required]),
      guarantor1_identification1: this.fb.control('', [Validators.required]),
      guarantor1_identification_type2: this.fb.control('', [Validators.required]),
      guarantor1_identification2: this.fb.control('', [Validators.required]),
      guarantor2_name: this.fb.control('', [Validators.required]),
      guarantor2_phoneno: this.fb.control('', [Validators.required]),
      guarantor2_address: this.fb.control('', [Validators.required]),
      guarantor2_identification_type1: this.fb.control('', [Validators.required]),
      guarantor2_identification1: this.fb.control('', [Validators.required]),
      guarantor2_identification_type2: this.fb.control('', [Validators.required]),
      guarantor2_identification2: this.fb.control('', [Validators.required]),
     })
  }

  showStandard(template: TemplateRef<any>) {
		this.toastService.show({ template,  message:'' });
	}

	showSuccess(template: TemplateRef<any>, message: string = 'Default success message') {
		this.toastService.show({ template, classname: 'bg-success text-light', delay: 5000, message:message });
	}

	showDanger(template: TemplateRef<any>, message: string = 'Default success message') {
		this.toastService.show({ template, classname: 'bg-danger text-light', delay: 15000,  message:message });
	}

	ngOnDestroy(): void {
		this.toastService.clear();
	}

  handleFileUpload(e: any, type: string, success, danger) {
     switch (type) {
          case 'g1_identification_file1':
            // Code specific to the "identification card" file type for individuals
            this.UI1=true
            break;
            case 'g1_identification_file2':
              // Code specific to the "identification card" file type for individuals
              this.UI2=true;
              break;
              case 'g2_identification_file1':
                // Code specific to the "identification card" file type for individuals
                this.UI3=true;
                break;
                case 'g2_identification_file2':
                  // Code specific to the "identification card" file type for individuals
                  this.UI4=true
                  break;
            }
    let file = e.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('visibility', 'public');
  
    this._http.post(`${environment.baseUrl}/upload`,formData).subscribe({
      next: (res: any) => {
         this.showSuccess(success);
        const file = res.data;
        switch (type) {
          case 'g1_identification_file1':
            // Code specific to the "identification card" file type for individuals
            this.g1_IdentificationDocumentFile1 = file;
            break;
            case 'g1_identification_file2':
            // Code specific to the "identification card" file type for individuals
            this.g1_IdentificationDocumentFile2 = file;
            break;
          case 'g2_identification_file1':
            // Code specific to the "identification card" file type for individuals
            this.g2_IdentificationDocumentFile1 = file;
            break;
            case 'g2_identification_file2':
            // Code specific to the "identification card" file type for individuals
            this.g2_IdentificationDocumentFile2 = file;
            break;
          // case 'avatar':
          //   // Code specific to the "avatar" file type for individuals
          //   this.avatarFile = file;
          //   break;
          default:
            // Handle any other file type for individuals as needed
            break;
        }
      },
      complete: () => {
        
        // Reset the loading flag after upload is complete
        switch (type) {
          case 'g1_identification_file1':
            // Code specific to the "identification card" file type for individuals
            this.g1_uploadedIdentificationDocumentFile1 =environment.baseUrl + '/file/get/' + this.g1_IdentificationDocumentFile1 ;
            this.UI1=false;
            break;
            case 'g1_identification_file2':
            // Code specific to the "identification card" file type for individuals
        
            this.g1_uploadedIdentificationDocumentFile2 =environment.baseUrl + '/file/get/' + this.g1_IdentificationDocumentFile2 ;
            this.UI2=false;

            break;
            case 'g2_identification_file1':
            // Code specific to the "identification card" file type for individuals
            this.g2_uploadedIdentificationDocumentFile1 =environment.baseUrl + '/file/get/' + this.g2_IdentificationDocumentFile1 ;
            this.UI3=false;

            break;
            case 'g2_identification_file2':
            // Code specific to the "identification card" file type for individuals
        
            this.g2_uploadedIdentificationDocumentFile2 =environment.baseUrl + '/file/get/' + this.g2_IdentificationDocumentFile2 ;
            this.UI4=false;

            break;
          // case 'avatar':
          //   // Code specific to the "profile picture" file type for individuals
          //   this.uploadedAvatarFile = environment.baseUrl + '/file/get/' + this.avatarFile;
          //   this.loader=false;
          //   this.img = true;
          //   break;
          default:
            // Handle any other file type for individuals as needed
            break;
        }
      },
      error: (error) => {
        error = this.showDanger(danger)
      },
    });
    
  }

  submit($success, $danger){
    
    if(this.LoanForm.invalid){
      this.spinner.hide()
      this.showDanger($danger);
      return;
    }
    
    const baseUrlLength = (environment.baseUrl + '/file/get/').length;
 this.g1_IdentificationDocumentFile1 = this.g1_uploadedIdentificationDocumentFile1.slice(
    baseUrlLength,
    this.g1_uploadedIdentificationDocumentFile1.length
  );

  this.g1_IdentificationDocumentFile2 = this.g1_uploadedIdentificationDocumentFile2.slice(
    baseUrlLength,
    this.g1_uploadedIdentificationDocumentFile2.length
  );

  this.g2_IdentificationDocumentFile1 = this.g2_uploadedIdentificationDocumentFile1.slice(
    baseUrlLength,
    this.g2_uploadedIdentificationDocumentFile1.length
  );

  this.g2_IdentificationDocumentFile2 = this.g2_uploadedIdentificationDocumentFile2.slice(
    baseUrlLength,
    this.g2_uploadedIdentificationDocumentFile2.length
  );

    const formData={
      loan_amount: this.LoanForm.value.loan_amount,
      has_loan: 'yes',
      installment_period: this.LoanForm.value.installment_period,
      guarantor1_name: this.LoanForm.value.guarantor1_name,
      guarantor1_phoneno: this.LoanForm.value.guarantor1_phoneno,
      guarantor1_address: this.LoanForm.value.guarantor1_address,
      guarantor1_identification_type1: this.LoanForm.value.guarantor1_identification_type1,
      guarantor1_identification1: this.LoanForm.value.guarantor1_identification1,
      guarantor1_identification_file1: this.g1_IdentificationDocumentFile1,
      guarantor1_identification_type2: this.LoanForm.value.guarantor1_identification_type2,
      guarantor1_identification2: this.LoanForm.value.guarantor1_identification2,
      guarantor1_identification_file2: this.g1_IdentificationDocumentFile2,
      guarantor2_name: this.LoanForm.value.guarantor2_name,
      guarantor2_phoneno: this.LoanForm.value.guarantor2_phoneno,
      guarantor2_address: this.LoanForm.value.guarantor2_address,
      guarantor2_identification_type1: this.LoanForm.value.guarantor2_identification_type1,
      guarantor2_identification1: this.LoanForm.value.guarantor2_identification1,
      guarantor2_identification_file1: this.g2_IdentificationDocumentFile1,
      guarantor2_identification_type2: this.LoanForm.value.guarantor2_identification_type2,
      guarantor2_identification2: this.LoanForm.value.guarantor2_identification2,
      guarantor2_identification_file2: this.g2_IdentificationDocumentFile2,
    }
    this._http.post(`${environment.baseUrl}/user/extra/${this.id}`, formData)
    .subscribe({
      next: (response) => {
        console.log('registration uploaded succesful', response)
        this.showSuccess($success)
        this.router.navigate([`/guest-dashboard`])
        
      },
      error: (res) => {
        
        console.log('Upload Failed')
      }  
});

const formData2 = {
    user_id:this.id,
    loan_amount: this.LoanForm.value.loan_amount,
    installment_period:this.LoanForm.value.installment_period
}
this._http.post(`${environment.baseUrl}/user/loan`, formData2)
    .subscribe({
      next: (response) => {
       this.showSuccess($success)
        console.log('Loan Added', response)
         
      },
      error: (res) => {
        window.alert('You already have a loan')
        console.log('User Exists')
      }  
});


}




  next(){
    this.loan1=false;
    this.loan2=true;
  }
  back(){
    this.loan1=true;
    this.loan2=false;
  }


}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FilterService } from 'primeng/api';
import { ColumnFilter } from 'primeng/table';
import { Router, ActivatedRoute,
  ActivatedRouteSnapshot,
  Route, } from '@angular/router';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { environment } from 'src/app/demo/environment';
import { printDiv } from 'src/app/demo/print-div';

@Component({
  selector: 'app-tbl-bootstrap',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './tbl-bootstrap.component.html',
  styleUrls: ['./tbl-bootstrap.component.scss'],
})
export default class TblBootstrapComponent implements OnInit {
  borrowers:any[];
  statuses!: any[];
  activityValues!: any[];
  id: any;
  user: any;
  loan: void;
  loader: boolean=false;
  userModal: boolean=false;
  oneuser: any;
  activeuser: any;
  avatar_file: string;
  activeloan: any;
  loancard:boolean=true;
  loanercard:boolean=false;
  acceptance:boolean=false;
  activeloaners:boolean=true;
  pending:boolean=true;
  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private _http:HttpClient,
    private modalService: NgbModal
  ){}
  visible: boolean = false;

  showDialog() {
      this.visible = true;
     
  }
showacceptance(){
  this.pending=false;
  this.acceptance=true;
  this.loanercard=false;
  this.activeloaners=false;

}
closeacceptance(){
  this.acceptance=false;
  this.loanercard=true;
  this.activeloaners=true;
  this.pending=true;
  

}
 switch(){
  this.loanercard= false;
  this.pending= true;
 }
  ngOnInit(): void {
    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
  ];
  this.getuser();
  
  
  }
  
  

  getuser(){
    
    
    this._http.get(`${environment.baseUrl}/user/get/unapproved`)
    .subscribe((response:any)=>{
      console.log(response);

      this.user = response.users.filter((user: any) => user.approved = 'approved' && user.has_loan && !user.active);
      this.activeuser = response.users.filter((user: any) => user.active);

      this.loan = this.user.loans.toLocalestring()
      console.log(this.user.loans[0].loan_amount)
    })
  }
  getloanerdetails($id){
    this.loancard=false;
    this.pending = false;
    this.loanercard=true;
    
    const id = $id;
    this._http.get(`${environment.baseUrl}/user/get/unapproved/${id}`)
    .subscribe((response:any)=>{
      this.avatar_file = environment.baseUrl + '/file/get/';
   
      this.activeloan=response.users;

    })

  }
  view($id){

    this.loader = true;
    
    const id = $id;
    this._http.get(`${environment.baseUrl}/user/get/unapproved/${id}`)
    .subscribe((response:any)=>{
      this.avatar_file = environment.baseUrl + '/file/get/';
    this.loader = false;
    this.userModal = true;
      this.oneuser=response.users;

    })
  }
  activate($id){
    const id = $id
    const formData = {
      active:'activate'
    };
    this._http.post(`${environment.baseUrl}/user/activate/${id}`, formData)
    .subscribe((response:any)=>{
      location.reload();
      window.alert('User Activated')
  })

  }

  updatepay($id){
    console.log($id)
    this._http.get(`${environment.baseUrl}/user/update/${$id}`)
    .subscribe((response:any)=>{
      
      location.reload();

    })
  }
  print(){}
  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  getSeverity(status: string) {
    switch (status.toLowerCase()) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';

        case 'new':
            return 'info';

        case 'negotiation':
            return 'warning';
        default:
          return 'unknown';

    }
}
  
}

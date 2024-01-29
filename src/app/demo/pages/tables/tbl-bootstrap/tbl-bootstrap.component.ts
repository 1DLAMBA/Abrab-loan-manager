import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FilterService, MessageService } from 'primeng/api';
import { ColumnFilter } from 'primeng/table';
import {
  Router, ActivatedRoute,
  ActivatedRouteSnapshot,
  Route,
} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/demo/environment';
import { printDiv } from 'src/app/demo/print-div';
import {
  trigger, state, style, animate, transition, query, group
} from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tbl-bootstrap',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './tbl-bootstrap.component.html',
  styleUrls: ['./tbl-bootstrap.component.scss'],
  providers: [MessageService],
  animations: [
    trigger('fade', [
      transition('void => active', [ // using status here for transition
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(1000, style({ opacity: 0 }))
      ])
    ])
  ]

})
export default class TblBootstrapComponent implements OnInit {
  borrowers: any[];
  statuses!: any[];
  activityValues!: any[];
  id: any;
  user: any;
  loan: void;
  loader: boolean = false;
  userModal: boolean = false;
  oneuser: any;
  activeuser: any;
  avatar_file: string;
  activeloan: any;
  loancard: boolean = true;
  loanercard: boolean = false;
  acceptance: boolean = false;
  activeloaners: boolean = true;
  pending: boolean = true;
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private route: ActivatedRoute,
    private _http: HttpClient,
    private messageService: MessageService,

    private modalService: NgbModal
  ) {
    this.adminform = this.fb.group({
      admin_charges: this.fb.control('', [Validators.required])

    })
  }
  visible: boolean = false;
  visible1: boolean = false;
  adminform: FormGroup;

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
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Provide Administrative chrages' });
  }

  showDialog() {
    this.visible = true;

  }
  showacceptance() {
    this.pending = false;
    this.acceptance = true;
    this.loanercard = false;
    this.activeloaners = false;

  }
  closeacceptance() {
    this.acceptance = false;
    this.loanercard = true;
    this.activeloaners = true;
    this.pending = true;


  }
  switch() {
    this.loanercard = false;
    this.pending = true;
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



  getuser() {


    this._http.get(`${environment.baseUrl}/user/get/unapproved`)
      .subscribe((response: any) => {
        console.log(response);

        this.user = response.users.filter((user: any) => user.approved = 'approved' && user.loan_amount && !user.active);
        this.activeuser = response.users.filter((user: any) => user.active);

        this.loan = this.user.loans.toLocalestring()
        console.log(this.user.loans[0].loan_amount)
      })
  }
  getloanerdetails($id) {
    this.loancard = false;
    this.pending = false;
    this.loanercard = true;

    const id = $id;
    this._http.get(`${environment.baseUrl}/user/get/unapproved/${id}`)
      .subscribe((response: any) => {
        this.avatar_file = environment.baseUrl + '/file/get/';

        this.activeloan = response.users;

      })

  }
  view($id) {

    this.loader = true;

    const id = $id;
    this._http.get(`${environment.baseUrl}/user/get/unapproved/${id}`)
      .subscribe((response: any) => {
        this.avatar_file = environment.baseUrl + '/file/get/';
        this.loader = false;
        this.userModal = true;
        this.oneuser = response.users;

      })
  }

  activate($id) {
    const id = $id
    const formData = {
      active: 'activate'
    };
    const formData1 = {

      admin_charges: this.adminform.value.admin_charges
    };
   
    console.log(formData1.admin_charges)
    this._http.post(`${environment.baseUrl}/user/activate/${id}`, formData)
      .subscribe((response: any) => {
        location.reload();
        window.alert('User Activated')
      })




  }
  adminchargeswitch() {

  }
  terminate($id) {
    this._http.delete(`${environment.baseUrl}/user/loan/destroy/${$id}`)
    .subscribe((response: any) => {

      location.reload();

    })

  }

  updatepay($id) {
    console.log($id)
    this._http.get(`${environment.baseUrl}/user/update/${$id}`)
      .subscribe((response: any) => {

        location.reload();

      })
  }
  print() { 
    window.print();
  }
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

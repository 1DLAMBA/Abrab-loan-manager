import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from '../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare const AmCharts: any;

import '../../../assets/charts/amchart/amcharts.js';
import '../../../assets/charts/amchart/gauge.js';
import '../../../assets/charts/amchart/serial.js';
import '../../../assets/charts/amchart/light.js';
import '../../../assets/charts/amchart/pie.min.js';
import '../../../assets/charts/amchart/ammap.min.js';
import '../../../assets/charts/amchart/usaLow.js';
import '../../../assets/charts/amchart/radar.js';
import '../../../assets/charts/amchart/worldLow.js';

import dataJson from 'src/fake-data/map_data';
import mapColor from 'src/fake-data/map-color-data.json';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export default class DashboardComponent implements OnInit {
  adminInterestForm: FormGroup;
  user:any;
  oneuser:any;
  loader:boolean=false;
  userModal:boolean=false;
  uploadedAvatarFile: string;
  avatar_file: string;
  alluser: any;
  sales: any[] = [];
  approved: any;
  loanedamount: string;
  totalinterest: any;
  loanedpercent: any;
  rejected: any;
  paidamount: any;
  visible:boolean=false
  test: number;
  approvedusername: any;
  constructor(

    private _http:HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder
  ){
    this.adminInterestForm = this.fb.group({
        admin_interest: this.fb.control('', [Validators.required]),

    })

  }
  triggerApproval($id){
    this._http.get(`${environment.baseUrl}/user/get/unapproved/${$id}`)
    .subscribe((response:any)=>{
    this.visible =true;
    this.approvedusername = response.users.name;

      console.log(response);
    })
  }
  approve($id){
    const id = $id;
    const formData={
      admin_interest: this.adminInterestForm.value.admin_interest
    }
    this._http.post(`${environment.baseUrl}/user/approve/${id}`, formData)
    .subscribe((response:any)=>{
    this.visible =true;

      console.log(response);
      window.alert('User has been approved')
      this.getRegisteredUsers();
    })
  }

  view($id){

    this.loader = true;
    
    const id = $id;
    this._http.get(`${environment.baseUrl}/user/get/unapproved/${id}`)
    .subscribe((response:any)=>{
    this.loader = false;
    this.userModal = true;
      this.oneuser=response.users;

    })
  }

  getRegisteredUsers(){
    this._http.get(`${environment.baseUrl}/user/get/unapproved`)
    .subscribe((response:any)=>{
      console.log(response);
      this.loanedamount = response.loaned.toLocaleString();
      this.totalinterest = response.loaninterest.toLocaleString();
      this.user = response.users.filter((user: any) => !user.approved);
      this.rejected = response.users.filter((user: any) => user.approved=='rejected').length;
      this.paidamount = response.loanpaid;
       
      this.loanedpercent = (response.loanpaid / response.loaned) * 100; 
      this.alluser =response.users.length
      this.approved=response.users.filter((user: any) => user.approved).length;
      
      this.compute();
    })
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
  reject($id){
    this._http.get(`${environment.baseUrl}/user/reject/${$id}`)
    .subscribe((response:any)=>{
      window.alert('user rejected')
      this.getRegisteredUsers();
    })
  }
  ngOnInit() {
    this.avatar_file = environment.baseUrl + '/file/get/';
   

    this.getRegisteredUsers();
    setTimeout(() => {
      const latlong = dataJson;

      const mapData = mapColor;

      const minBulletSize = 3;
      const maxBulletSize = 70;
      let min = Infinity;
      let max = -Infinity;
      let i;
      let value;
      for (i = 0; i < mapData.length; i++) {
        value = mapData[i].value;
        if (value < min) {
          min = value;
        }
        if (value > max) {
          max = value;
        }
      }

      const maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI;
      const minSquare = minBulletSize * minBulletSize * 2 * Math.PI;

      const images = [];
      for (i = 0; i < mapData.length; i++) {
        const dataItem = mapData[i];
        value = dataItem.value;

        let square =
          ((value - min) / (max - min)) * (maxSquare - minSquare) + minSquare;
        if (square < minSquare) {
          square = minSquare;
        }
        const size = Math.sqrt(square / (Math.PI * 8));
        const id = dataItem.code;

        images.push({
          type: 'circle',
          theme: 'light',
          width: size,
          height: size,
          color: dataItem.color,
          longitude: latlong[id].longitude,
          latitude: latlong[id].latitude,
          title: dataItem.name + '</br> [ ' + value + ' ]',
          value: value,
        });
      }

      // world-low chart
      AmCharts.makeChart('world-low', {
        type: 'map',
        projection: 'eckert6',

        dataProvider: {
          map: 'worldLow',
          images: images,
        },
        export: {
          enabled: true,
        },
      });

      const chartDatac = [
        {
          day: 'Mon',
          value: 60,
        },
        {
          day: 'Tue',
          value: 45,
        },
        {
          day: 'Wed',
          value: 70,
        },
        {
          day: 'Thu',
          value: 55,
        },
        {
          day: 'Fri',
          value: 70,
        },
        {
          day: 'Sat',
          value: 55,
        },
        {
          day: 'Sun',
          value: 70,
        },
      ];

      // widget-line-chart
      AmCharts.makeChart('widget-line-chart', {
        type: 'serial',
        addClassNames: true,
        defs: {
          filter: [
            {
              x: '-50%',
              y: '-50%',
              width: '200%',
              height: '200%',
              id: 'blur',
              feGaussianBlur: {
                in: 'SourceGraphic',
                stdDeviation: '30',
              },
            },
            {
              id: 'shadow',
              x: '-10%',
              y: '-10%',
              width: '120%',
              height: '120%',
              feOffset: {
                result: 'offOut',
                in: 'SourceAlpha',
                dx: '0',
                dy: '20',
              },
              feGaussianBlur: {
                result: 'blurOut',
                in: 'offOut',
                stdDeviation: '10',
              },
              feColorMatrix: {
                result: 'blurOut',
                type: 'matrix',
                values: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .2 0',
              },
              feBlend: {
                in: 'SourceGraphic',
                in2: 'blurOut',
                mode: 'normal',
              },
            },
          ],
        },
        fontSize: 15,
        dataProvider: chartDatac,
        autoMarginOffset: 0,
        marginRight: 0,
        categoryField: 'day',
        categoryAxis: {
          color: '#fff',
          gridAlpha: 0,
          axisAlpha: 0,
          lineAlpha: 0,
          offset: -20,
          inside: true,
        },
        valueAxes: [
          {
            fontSize: 0,
            inside: true,
            gridAlpha: 0,
            axisAlpha: 0,
            lineAlpha: 0,
            minimum: 0,
            maximum: 100,
          },
        ],
        chartCursor: {
          valueLineEnabled: false,
          valueLineBalloonEnabled: false,
          cursorAlpha: 0,
          zoomable: false,
          valueZoomable: false,
          cursorColor: '#fff',
          categoryBalloonColor: '#51b4e6',
          valueLineAlpha: 0,
        },
        graphs: [
          {
            id: 'g1',
            type: 'line',
            valueField: 'value',
            lineColor: '#ffffff',
            lineAlpha: 1,
            lineThickness: 3,
            fillAlphas: 0,
            showBalloon: true,
            balloon: {
              drop: true,
              adjustBorderColor: false,
              color: '#ffffff',
              fillAlphas: 0.2,
              bullet: 'round',
              bulletBorderAlpha: 1,
              bulletSize: 5,
              hideBulletsCount: 50,
              lineThickness: 2,
              useLineColorForBulletBorder: true,
              valueField: 'value',
              balloonText: '<span style="font-size:18px;">[[value]]</span>',
            },
          },
        ],
      });
    }, 500);
  }
compute(){
  this.sales = [
    {
      title: 'Registered Users',
      icon: 'icon-user text-c-yellow',
      amount: this.alluser,
      progress: 0
    },
    {
      title: 'Approved Borrowers',
      icon: 'icon-user-check text-c-green',
      amount: this.approved,
      design: 'col-md-12',
    },
    {
      title: 'Rejected Borrowers',
      icon: 'icon-user-x text-c-red',
      amount: this.rejected,
      design: 'col-md-12',
    },
    {
      title: 'Total Loaned',
      amount: '₦ '+ this.loanedamount,
      percentage: Math.round(this.loanedpercent) + '%',
      progress: this.loanedpercent,
      design: 'col-md-12',
    },
    {
      title: 'Total applied loan',
      amount: '₦ '+ this.totalinterest,
      progress: false,
      design: 'col-md-12',
    },
    {
      title: 'Total Paid',
      amount: '₦ '+ this.paidamount,
   
      design: 'col-md-12',
    },

  ];
}

  card = [
    {
      design: 'border-bottom',
      number: '235',
      text: 'TOTAL IDEAS',
      icon: 'icon-zap text-c-green',
    },
    {
      number: '26',
      text: 'TOTAL LOCATIONS',
      icon: 'icon-map-pin text-c-blue',
    },
  ];

  social_card = [
    {
      design: 'col-md-12',
      icon: 'fab fa-facebook-f text-primary',
      amount: '12,281',
      percentage: '+7.2%',
      color: 'text-c-green',
      target: '35,098',
      progress: 60,
      duration: '3,539',
      progress2: 45,
    },
    {
      design: 'col-md-6',
      icon: 'fab fa-twitter text-c-blue',
      amount: '11,200',
      percentage: '+6.2%',
      color: 'text-c-purple',
      target: '34,185',
      progress: 40,
      duration: '4,567',
      progress2: 70,
    },
    {
      design: 'col-md-6',
      icon: 'fab fa-google-plus-g text-c-red',
      amount: '10,500',
      percentage: '+5.9%',
      color: 'text-c-blue',
      target: '25,998',
      progress: 80,
      duration: '7,753',
      progress2: 50,
    },
  ];

  progressing = [
    {
      number: '5',
      amount: '384',
      progress: 70,
    },
    {
      number: '4',
      amount: '145',
      progress: 35,
    },
    {
      number: '3',
      amount: '24',
      progress: 25,
    },
    {
      number: '2',
      amount: '1',
      progress: 10,
    },
    {
      number: '1',
      amount: '0',
      progress: 0,
    },
  ];

  tables = [
    {
      src: 'assets/images/user/avatar-1.jpg',
      name: 'Isabella Christensen',
      email: 'Lorem Ipsum is simply dummy',
      time: '11 MAY 12:56',
      color: 'text-c-green',
    },
    
  ];
}

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Abrab';
  view:boolean;

  constructor(private router: Router, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.view=true;
    }, 2000);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        this.view=false;
        return;
      }
      window.scrollTo(0, 0);
    });
    
  }

}

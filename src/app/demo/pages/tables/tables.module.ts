import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnFilter } from 'primeng/table';
import { TablesRoutingModule } from './tables-routing.module';
import { TableModule } from 'primeng/table';
import TblBootstrapComponent from './tbl-bootstrap/tbl-bootstrap.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [],

  imports: [CommonModule,
            TablesRoutingModule,
            TableModule,
            ButtonModule],
})
export class TablesModule {}

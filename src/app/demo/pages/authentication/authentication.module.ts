import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule,SharedModule, AuthenticationRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [AuthenticationRoutingModule, FormsModule, ReactiveFormsModule]
})
export class AuthenticationModule {}

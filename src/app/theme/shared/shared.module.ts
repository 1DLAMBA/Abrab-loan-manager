import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule, CardModule } from './components';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { SkeletonModule } from 'primeng/skeleton';
import { InputGroup } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
// bootstrap import
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { ToastsContainer } from 'src/app/demo/toasts-container.components';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    BreadcrumbModule,
    NgbModule,
    NgScrollbarModule,
    TableModule,
    TagModule,
    ProgressBarModule,
    DropdownModule,
    SliderModule,
    ButtonModule,
    InputTextModule,
    NgbModalModule,
    NgbTooltipModule,
    ToastsContainer,
    NgbToastModule,
    ToastModule,
    NgxSpinnerModule,
    DialogModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    BreadcrumbModule,
    SpinnerComponent,
    NgbModule,
    NgScrollbarModule,
    TableModule,
    TagModule,
    ProgressBarModule,
    DropdownModule,
    SliderModule,
    ButtonModule,
    InputTextModule,
    ToastsContainer,
    NgbToastModule,
    ToastModule,
    NgxSpinnerModule,
    DialogModule,
    SkeletonModule
  ],
})
export class SharedModule {}

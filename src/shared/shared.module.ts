import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './loading/loading.component';
import { MycurrencyPipe } from './pipes/mycurrency.pipe';

@NgModule({
  declarations: [LoadingComponent, MycurrencyPipe],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule, NgbModule
  ],
  exports: [MycurrencyPipe, NgbModule, CommonModule, FormsModule, ReactiveFormsModule, LoadingComponent]
})
export class SharedModule { }

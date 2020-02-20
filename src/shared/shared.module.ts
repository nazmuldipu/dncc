import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, LoadingComponent]
})
export class SharedModule { }

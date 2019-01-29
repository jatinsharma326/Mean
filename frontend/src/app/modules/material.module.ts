import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatFormFieldModule,MatCardModule,MatToolbarModule
    ,MatInputModule,MatProgressSpinnerModule,MatTabsModule, MatButtonModule, MatCheckboxModule,MatFormFieldModule
  ],
  exports: [
    CommonModule,MatFormFieldModule,MatCardModule,MatToolbarModule
    ,MatInputModule,MatProgressSpinnerModule,MatTabsModule, MatButtonModule, MatCheckboxModule,MatFormFieldModule
  ],
})
export class MaterialModule { }

import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule, MatInputModule,MatProgressSpinnerModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { AuthService } from '../auth/shared/auth.service';
import { HttpClientModule } from '@angular/common/http';
import {AuthGuard} from './shared/auth.guard';

const routes :Routes = [
  {path:'login',component:LoginComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent,canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [LoginComponent,RegisterComponent],
  imports: [
    CommonModule,ReactiveFormsModule,RouterModule.forChild(routes),MatCardModule,MatInputModule
    ,MatProgressSpinnerModule,MatButtonModule,FormsModule,MatFormFieldModule,MatCheckboxModule,MatTabsModule,MatToolbarModule,HttpClientModule
  ],
  providers:[AuthService,AuthGuard]
})
export class AuthModule { }

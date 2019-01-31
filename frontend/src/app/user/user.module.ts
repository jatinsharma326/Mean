import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule,Routes} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {ScheduleModule, AgendaService, DayService, DragAndDropService, ResizeService, WeekService, WorkWeekService, MonthService } from '@syncfusion/ej2-angular-schedule';// import { NgModule } from '@angular/core';
  
const routes:Routes = [{path:'admindashboard',component:DashboardComponent}];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),ScheduleModule,BrowserModule
  ],
  providers:[AgendaService, DayService, WeekService, WorkWeekService, MonthService,DragAndDropService,ResizeService]
})
export class UserModule { }

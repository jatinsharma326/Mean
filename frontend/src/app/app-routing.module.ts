import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './common/home/home.component'
import { AuthGuard } from './auth/shared/auth.guard'

const routes: Routes = [{path:'',component:HomeComponent,canActivate:[AuthGuard]}];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }



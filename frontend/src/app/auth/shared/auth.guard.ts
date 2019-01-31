import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router,RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private url:string;

  constructor(private auth:AuthService,private router:Router){}

  private handledAuthState():boolean{
      if(this.isLoginOrRegister()){
          this.router.navigate(['/dashboard']);
          return false;
      }
      return true;
  }

  private handleNotAuthState():boolean{
      if(this.isLoginOrRegister()){
          return true;
      }
      this.router.navigate(['/login']);
      return false;
  }

  private isLoginOrRegister():boolean{
      if(this.url.includes('login') || this.url.includes('register')){
          return true;
      }
      return false;
  }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
      this.url = state.url;
      if(this.auth.isAuthenticated()){
          return this.handledAuthState();
      }
      return this.handleNotAuthState();
  }
}
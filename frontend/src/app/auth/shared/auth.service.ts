import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

class DecodeToken {
  exp:number = 0;
  email:string = '';
}

@Injectable()
export class AuthService {
  private decodedToken;
  private _registerUrl = "http://localhost:3000/api/v1/users/register";
  private _loginUrl = "http://localhost:3000/api/v1/users/auth";
  constructor(private http:HttpClient ) {
    this.decodedToken = JSON.parse(localStorage.getItem('secret')) || new DecodeToken();
   }

  private saveToken(token:string):string{
    this.decodedToken = jwt.decode(token);
    localStorage.setItem('secret_auth',token);
    localStorage.setItem('secret',JSON.stringify(this.decodedToken));
    return token;
  }


  private getExpiration(){
    return moment.unix(this.decodedToken.exp);

  }
  public register(userData:any):Observable<any>{
    return this.http.post<any>(this._registerUrl,userData);
  }
  public login(userData:any):Observable<any>{
    return this.http.post<any>(this._loginUrl,userData).pipe(
      map(
        (token:string)=>{
        this.saveToken(token);
        }
      )
    )
  } 
  public logout(){
    localStorage.removeItem('secret_auth');
    localStorage.removeItem('secret');

    this.decodedToken = new DecodeToken();

  }
  public isAuthenticated():boolean{

 return moment().isBefore(moment.unix(this.decodedToken.exp));
}

public getUsername():string{
  return this.decodedToken.username;
}
}

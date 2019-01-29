import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/v1/users/register";
  constructor(private http:HttpClient ) { }
  public register(userData:any):Observable<any>{
    return this.http.post<any>(this._registerUrl,userData);
  }

}

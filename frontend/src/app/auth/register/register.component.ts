import { Component, OnInit } from '@angular/core';
import{ AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  formData:any = {};
  
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
  this.formData = {};
  }
register(){
  console.log(this.formData);
  this.auth.register(this.formData).subscribe(
    (res)=>{
      console.log(res);
    },
    (errorResponse)=>{
      console.log(errorResponse);

    })
}

  }
  

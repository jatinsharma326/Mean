import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import{ AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  loginForm:FormGroup;
  notifyMessage:string = '';
  constructor(private fb:FormBuilder,
              private auth:AuthService,
              private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe((params)=>{
      if(params['registered'] == 'success'){
        this.notifyMessage = "You have been successfully registered,you can login now";
      }
    })
  }
  initForm(){
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password:['',Validators.required]
    })
  }
  login(){
    console.log(this.loginForm.value);

    this.auth.login(this.loginForm.value).subscribe(
      ( token )=>{
        this.router.navigate(['admindashboard']);
      },
      (err)=>{
        console.log(err);
      }
    )
  }
}

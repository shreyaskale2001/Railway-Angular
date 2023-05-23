import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = "";
  password: string = "";

  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router){ }

  // ngOnInit():void{
  //   // this.loginForm=this.fb.group({

  //   // });
  // }


  onSubmit() {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.email.trim() == "" || this.password.trim() == "") {
      alert("Please Enter All The Details!");
      this.password="";
    }
    else if (!this.email.trim().match(mailformat)) {
      alert("Please Enter a Valid Email ID!");
      this.password="";
    }
    else {
      console.log(this.email + " " + this.password);
      this.auth.login({email:this.email.trim(), password:this.password.trim()}).subscribe({
        next:(res)=>{
          this.email="";
          this.password="";
          // alert(res.token);
          this.auth.setToken(res.token);
          // localStorage.setItem("token", res.token);
          this.router.navigate(['search']);
        },
        error:(err)=>{
          alert(err?.error.message);
          this.password="";
        }
      });
    }
  }

  hideShowPass(){

  }
}

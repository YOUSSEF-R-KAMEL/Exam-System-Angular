import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!:FormGroup
  users: any[] = []
  type:string = 'students'
  constructor(private build:FormBuilder, private services:AuthService, private toastr:ToastrService, private router:Router){
    this.createForm()
    this.getUsers()
  }

  createForm(){
    this.loginForm = this.build.group({
      type: [this.type],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  getRole(event:any){
    this.type = event.value;
    this.getUsers()
  }

  getUsers(){
    this.services.getUsers(this.type).subscribe((res: any) => {
      this.users = res;
    })
  }

  submit(){
    let index = this.users.findIndex(item => item.email == this.loginForm.value.email && item.password == this.loginForm.value.password)
    if(index == -1){
      this.toastr.error("email or password incorrect", "", {
        timeOut: 5000
      })
    }
    else {
      const model = {
        username: this.users[index].username,
        role: this.type,
        userID: this.users[index].id
      }
      this.services.login(model).subscribe((res:any) => {
        this.services.user.next(res)
        this.toastr.success("successfully login", "", {
          timeOut: 5000
        })
        this.router.navigate(['/subjects'])
      })

    }
  }



}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  userForm!: FormGroup;
  students: any[] = [];
  constructor(
    private build: FormBuilder,
    private services: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.createRegForm();
    this.getUsers();
  }

  createRegForm() {
    this.userForm = this.build.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  getUsers() {
    this.services.getUsers('students').subscribe((res: any) => {
      this.students = res;
    });
  }

  submit() {
    const model = {
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    };

    let index = this.students.findIndex((item) => item.email == model.email);
    console.log(index);

    if (index !== -1) {
      this.toastr.error('Email already exists', '', {
        timeOut: 5000,
      });
    } else {
      this.services.createUser(model).subscribe((res: any) => {

        const model = {
          username: res.username,
          role: 'students',
          userID: res.id,
        };
        this.services.login(model).subscribe((res: any) => {
          this.services.user.next(res);
          this.toastr.success('successfully login', '', {
            timeOut: 5000,
          });
          this.router.navigate(['/subjects']);
        });
      });
    }
  }
}

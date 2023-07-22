import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'McqExam';

  constructor(private services:AuthService){
    this.getUserData()
  }

  getUserData(){
    this.services.getRole().subscribe((res:any) => {
      this.services.user.next(res)
    })
  }
}

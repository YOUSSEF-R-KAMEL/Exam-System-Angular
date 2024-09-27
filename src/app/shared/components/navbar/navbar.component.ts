import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user:any = null
  constructor(private services:AuthService){
    this.services.user.subscribe((res:any) => {
      if(res.role){
        this.user = res
      }
    })
  }

  logout(){
    const model = {}
    this.services.login(model).subscribe((res: any) => {
      this.user = null
      // this.services.user.next(res)
    })
  }

}

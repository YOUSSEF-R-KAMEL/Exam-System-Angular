import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent {
  subjects:any[] = []
  showBool:boolean= false;

  constructor(private services:DoctorService, private auth:AuthService, private toastr:ToastrService){
    this.getRole()
    this.getAllSubjects()
  }

  getAllSubjects(){
    this.services.getAllSubjects().subscribe((res:any) => {
      this.subjects = res
    })
  }

  getRole(){
    this.auth.getRole().subscribe((res:any) => {
      this.showBool = (res.role == 'students')
    })
  }

  Delete(index:number){
    let id = this.subjects[index].id;
    this.subjects.splice(index, 1)
    this.services.deleteSubject(id).subscribe((res:any) => {
      this.toastr.success("Deleted Subjects")
    })

  }

}

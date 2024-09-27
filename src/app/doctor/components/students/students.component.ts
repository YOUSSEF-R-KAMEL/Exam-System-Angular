import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  allStudents: any[] = [];
  dataSource: any;
  dataTable: any;
  displayedColumns: any;

  constructor(
    private doctor: DoctorService,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.getAllStudents();
    this.displayedColumns = ['position', 'name', 'subjectName', 'degree'];
  }

  getAllStudents() {
    this.auth.getUsers('students').subscribe((res: any) => {
      this.dataSource = res?.map((student:any) => {
        if(student?.subjects){
          return student?.subjects?.map((sub:any) => {
            return {
              name: student.username,
              subjectName: sub.name,
              degree: sub.degree
            }
          })
        }else {
          return [{
            name: student.username,
            subjectName: '----',
            degree: '----'
          }]
        }
      })
      // console.log(this.dataSource)
      this.dataTable = []

      this.dataSource.forEach((item:any) => {
        item.forEach((subItem:any) => {
          // console.log(subItem)
          this.dataTable.push({
            name: subItem.name,
            subjectName: subItem.subjectName,
            degree: subItem.degree,
          })
        })
      });
    });
  }
}

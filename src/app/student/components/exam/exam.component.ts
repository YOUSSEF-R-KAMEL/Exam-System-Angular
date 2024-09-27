import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from 'src/app/doctor/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent {
  id: any = 0;
  subject: any = {};
  showBool: boolean = false;
  answers: any[] = [];
  points: number = 0;
  showResult: boolean = false;
  correctAnswers: any[] = [];
  studentAnswers: any[] = [];
  user: any;
  studentInfo: any;
  userSubjects:any[] = [];
  validExam:boolean = true
  constructor(
    private route: ActivatedRoute,
    private doctor: DoctorService,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSubjectByID();
    this.getRole();
  }

  getSubjectByID() {
    this.doctor.getSubjectByID(this.id).subscribe((res: any) => {
      this.subject = res;
    });
  }

  getRole() {
    this.auth.getRole().subscribe((res: any) => {
      this.showBool = res.role == 'students';
      this.user = res;
      this.getUserData();
      // console.log(this.user);
    });
  }

  getUserData() {
    this.auth.getStudentByID(this.user.userID).subscribe((res: any) => {
      this.studentInfo = res;
      this.userSubjects = res?.subjects ? res?.subjects : []
      this.checkExamValid()
    });
  }

  Delete(index: any) {
    this.subject.questions.splice(index, 1);
    const model = {
      name: this.subject.name,
      questions: this.subject.questions,
    };

    this.doctor.updateSubject(model, this.id).subscribe((res: any) => {
      this.toastr.success('Deleted Question');
    });
  }

  getAnswer(event: any, index: number) {
    let value = event.value;
    // let correctAns = this.subject.questions[index].correctAnswer;
    this.subject.questions[index].studentAnswer = value;
  }

  result() {
    for (let x in this.subject.questions) {
      this.correctAnswers.push(this.subject.questions[x].correctAnswer);
      this.studentAnswers.push(this.subject.questions[x].studentAnswer);
      if (
        this.subject.questions[x].studentAnswer ===
        this.subject.questions[x].correctAnswer
      ) {
        this.points++;
      }
    }
    this.showResult = true;
    this.userSubjects.push({
      name: this.subject.name,
      subjectID: this.id,
      degree: this.points
    })

    const model = {
      username: this.studentInfo.username,
      email: this.studentInfo.email,
      password: this.studentInfo.password,
      subjects: this.userSubjects
    };

    this.auth.updateStudent(this.user.userID, model).subscribe((res:any) => {
      this.toastr.success("Done Exam")
    })
  }

  checkExamValid(){
    for (let x in this.userSubjects) {
      if (this.userSubjects[x].subjectID == this.id) {
        this.validExam = false
        this.points = this.userSubjects[x].degree
        this.toastr.warning("This exam has already been completed")
      }
    }
    // console.log(this.userSubjects)
  }
}

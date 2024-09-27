import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent {

  name = new FormControl("")
  questionsForm!: FormGroup
  questions:any = [];
  correctAns:any
  subjectName:any= ""
  startAddQues:boolean = false
  preview:boolean = false
  id:any;
  // selectedIndex = 0

  constructor(private builder: FormBuilder, private toast:ToastrService, private services:DoctorService) {
    this.createForm()
  }

  start(){
    if(this.name.value == ""){
      this.toast.error("please write subject name")
    } else {
      this.startAddQues = true
      this.subjectName = this.name.value
    }

    // if(this.startAddQues){
    //   this.selectedIndex = 1
    // }
  }

  createForm(){
    this.questionsForm = this.builder.group({
    question: ['', [Validators.required]],
    answer1: ['', [Validators.required]],
    answer2: ['', [Validators.required]],
    answer3: ['', [Validators.required]],
    answer4: ['', [Validators.required]],
    })
  }

  getCorrect(event:any) {
    this.correctAns = event.value
  }

  // Create Questions
  Save(){
    if(this.correctAns){
      const model = {
        question: this.questionsForm.value.question,
        answer1: this.questionsForm.value.answer1,
        answer2: this.questionsForm.value.answer2,
        answer3: this.questionsForm.value.answer3,
        answer4: this.questionsForm.value.answer4,
        correctAnswer: this.questionsForm.value[this.correctAns]
      }
      this.questions.push(model)
      this.questionsForm.reset()
      console.log(this.questions)
    }
    else {
      this.toast.error("please choose the correct answer")
    }
  }

  // clear form
  Delete(){
    this.questionsForm.reset()
  }

  // cancel all questions and subject
  Cancel(){
    this.Delete()
    this.questions = []
    this.subjectName = ""
    this.name.reset()
    this.startAddQues = false

  }

  // submit
  Finish(){
    const model = {
      name: this.subjectName,
      questions: this.questions
    }
    if(!this.preview){
      this.services.createSubject(model).subscribe((res:any) => {
        this.preview = true
        this.id = res.id
    })
    }


  }

  remove(index:any){
    this.questions.splice(index, 1)
    console.log(this.id)
    const model = {
      name: this.subjectName,
      questions: this.questions
    }

    this.services.updateSubject(model, this.id).subscribe((res:any) => {
      this.toast.success("Deleted Question")
    })
  }


}

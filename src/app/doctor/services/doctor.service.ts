import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  createSubject(model:any){
    return this.http.post(environment.baseAPI + 'subjects', model)
  }

  updateSubject(model:any, id:number){
    return this.http.put(environment.baseAPI + 'subjects/' + id, model)
  }

  getAllSubjects(){
    return this.http.get(environment.baseAPI + 'subjects')
  }

  getSubjectByID(id:number){
    return this.http.get(environment.baseAPI + 'subjects/' + id)
  }

  deleteSubject(id:number){
    return this.http.delete(environment.baseAPI + 'subjects/' + id)
  }

}

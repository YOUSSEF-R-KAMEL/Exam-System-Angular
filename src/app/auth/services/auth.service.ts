import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject()

  constructor(private http:HttpClient) {

  }

  createUser(model:any){
    return this.http.post(environment.baseAPI +  'students', model);
  }

  login(model:any){
    return this.http.put(environment.baseAPI + 'login/1', model);
  }

  getUsers(type:string){
    return this.http.get(environment.baseAPI +  type);
  }

  getStudentByID(id:number){
    return this.http.get(environment.baseAPI +  "students/" + id);
  }

  updateStudent(id:number, model:any){
    return this.http.put(environment.baseAPI + 'students/' + id, model);
  }

  getRole(){
    return this.http.get(environment.baseAPI +  'login/1');
  }
}

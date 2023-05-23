import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string="https://localhost:44348/api/";

  constructor(private http:HttpClient, private router:Router) {}
  signup(userObj:any){
    return this.http.post<any>(`${this.baseUrl}Authenticate/User_register`, userObj);
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}Authenticate/login`, loginObj);
  }

  setToken(token:string){
    localStorage.setItem("token", token);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  getAuthorizationHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`
    });
  }

  isLoggedIn():boolean{
    return (!!localStorage.getItem("token")); // 2 exclamation marks to convert string to boolean
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['signin']);
  }

  search(searchObj:any){
    return this.http.post<any[]>(`${this.baseUrl}Search/Search`, searchObj);
  }

  getTrainById(id:number){
    return this.http.get(`${this.baseUrl}TrainDetail/id?id=${id}`);
  }

  bookTicket(bookObj:any){
    const headers = this.getAuthorizationHeaders();
    return this.http.post<any>(`${this.baseUrl}Booking`, bookObj, {headers});
  }
}

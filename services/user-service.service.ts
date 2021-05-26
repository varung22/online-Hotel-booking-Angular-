import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Login } from '../classes/Login';
import { User } from '../classes/user';
import { environment } from './../../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';  

@Injectable()
export class UserServiceService {

  @Output() 
  getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,
    private http: HttpClient) { }

  register(user: User) {
      return this.http.post(`${environment.apiUrl}/rest/register`, user);
  }

  login(adminDetail : Login) : Observable<any> {  
      return this.http.post(`${environment.apiUrl}/rest/login`, adminDetail);  
  }  

  loggedIn(username: string): boolean {
    this.getLoggedInName.emit(username);
    return true;
  }
  
  logout() {
    localStorage.removeItem('token');  
    localStorage.removeItem('user'); 
    this.router.navigate(['']);  
  } 

  /* 
  * Check whether User is loggedIn or not. 
  */  
  
 isLoggedIn() {     
  let jwtHelper = new JwtHelperService();    
  let token = localStorage.getItem('token');   
  if(!token) {  
    return false;  
  }  

  // get the Expiration date of the token by calling getTokenExpirationDate(String) method of JwtHelper class. this method accepts a string value which is nothing but a token.  
  if(token) {  
    let expirationDate = jwtHelper.getTokenExpirationDate(token);  
    let isExpired = jwtHelper.isTokenExpired(token);  
    return !isExpired;      
  }     
}  
  
  
// getAdminDetail(adminId) : Observable<any>  
// {  
//     let url = this.baseUrl + "getAdminData/" + adminId;  

//      // create an instance of Header object.  
//     let headers = new Headers();  

//     // get token from localStorage.  
//     let token = localStorage.getItem('token');  

//     // Append Authorization header.  
//     headers.append('Authorization' , 'Bearer ' + token);  

//     // create object of RequestOptions and include that in it.  
//     let options = new RequestOptions( { headers : headers } );  

//     return this.http.get(url , options);  
// }
}

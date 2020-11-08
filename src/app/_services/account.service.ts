import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators'; //import observables
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root' //atur previlages
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/'; 
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable(); //penulisan variable Observable pada currentUser$ diakhiri $

  constructor(private http : HttpClient ) { }
  
  login(model:any)
  {
    // return this.http.post(this.baseUrl + 'Account/login' ,model); //push data ke server API https://localhost:5001/api/account/login
    return this.http.post(this.baseUrl + 'Account/login' ,model).pipe(
      // map((response: any)=> {
        map((response: User)=> {
        const user = response;
        if (user)
        { //simpan di lokal browser
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(model: any)
  {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        // return user;
      })
    )
  }

  setCurrentUser(user: User)
  {
    this.currentUserSource.next(user);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
  

}

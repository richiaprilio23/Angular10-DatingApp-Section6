import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', //panggil file ini
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App panggil dengan variable';
  users: any; //jenis keamanan

  constructor(private http: HttpClient) //http akses ke dotnet5 secara asynchronous
  {}

  //method main
  ngOnInit() {
   this.GetUsers();
  }

  //method GetUsers
  GetUsers() {
    this.http.get('https://localhost:5001/api/users')
    .subscribe(
      Response => {
        this.users = Response;
      },
      error => {
        console.log(error);
      }
      
    ) //response callbacks
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any ={}
  // loggedIn: boolean;
  currentUser$: Observable<User>;

  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    // this.getCurrentUser();
    this.currentUser$ = this.accountService.currentUser$;
  }

  login()
  {
    // console.log(this.model);
    this.accountService.login(this.model).subscribe(response => {
      // console.log(response);
      this.router.navigateByUrl('/members'); //saat login redirect ke halaman members
      // this.loggedIn = true;
    }, error =>{
      console.log(error);
      this.toastr.error(error.error);
    }
    )
  }

  logout()
  {
    this.accountService.logout();
    // this.loggedIn = false;
    this.router.navigateByUrl('/'); //saat logout kembali ke Home
  }

  // getCurrentUser()
  // {
  //   this.accountService.currentUser$.subscribe(user =>{
  //     this.loggedIn = !!user; //tanda ! mnjd 1 miliyar user
  //   }, error =>{
  //     console.log(error);
  //   }
  //   )
  // }
}

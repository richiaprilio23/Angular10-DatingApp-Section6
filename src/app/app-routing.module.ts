import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
  
//route komponen 
const routes: Routes = [
  {path:'', component: HomeComponent},
  {
    path:'', runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children:
    [
      {path:'members', component: MemberListComponent, canActivate: [AuthGuard]}, //http://localhost:4200/members
      {path:'members/:id', component: MemberDetailComponent},
      {path:'lists', component: ListsComponent}, //http://localhost:4200/lists
      {path:'messages', component: MessagesComponent}, //http://localhost:4200/messages
    ]
  },
  {path:'**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LandingComponent } from './landing/landing.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { ShowComponent } from './show/show.component';
import { AnswerComponent } from './answer/answer.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    component: UserComponent
  },
  {
    path: 'landing',
    pathMatch: "full",
    component: LandingComponent
  },
  {
    path: 'new_question',
    pathMatch: 'full',
    component: NewQuestionComponent
  },
  {
    path: 'landing/new_question',
    pathMatch: 'full',
    redirectTo: '/new_question'
  },
  {
    path: 'landing/question/:id',
    pathMatch: 'full',
    component: ShowComponent
  },
  {
    path: 'landing/question/:id/new_answer',
    pathMatch: 'full',
    component: AnswerComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

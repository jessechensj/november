import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';

import { ServiceService } from './service.service'
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { ShowComponent } from './show/show.component';
import { AnswerComponent } from './answer/answer.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LandingComponent,
    NewQuestionComponent,
    ShowComponent,
    AnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

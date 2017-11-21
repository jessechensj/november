import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from './../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  question_id;
  question;
  obj;
  user;

  constructor(
    private _route: ActivatedRoute,
    private _serviceService: ServiceService,
    private _router : Router
  ) {
  }


  ngOnInit() {
    this._route.paramMap.subscribe( params => {
      this._serviceService.getOneQuestion(params.get('id'), (response) => {this.question = response});
      this.question_id = params.get('id');
      this.user = this._serviceService.name;
      this.obj = {
        _question: this.question_id,
        user: this.user,
        answer:'',
        details:'',
        likes: 0
      }
  })}

  submitAnswer(){
    console.log(this.question_id)
    this._serviceService.saveAnswer(this.obj, (res)=>{
      this.obj = {answer:'',details:'',_question: this.question_id, likes:0};
			this._router.navigate(['/landing']);
    });
  }

  logout(){
    this._serviceService.logout();
  }
}

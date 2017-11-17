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
  obj = {
    _question: this.question_id,
    answer:'',
    details:'',
    likes: 0
  }

  constructor(
    private _route: ActivatedRoute,
    private _serviceService: ServiceService,
    private _router : Router
  ) { this._route.paramMap.subscribe( params => {
    this._serviceService.getOneQuestion(params.get('id'), (response) => {this.question = response});
    this.question_id = params.get('id');
    })
  }


  ngOnInit() {
  }

  submitAnswer(){
    this._serviceService.saveAnswer(this.obj, (res)=>{
      this.obj = {answer:'',details:'',_question: this.question_id, likes:0};
			this._router.navigate(['/landing']);
    });
  }

}

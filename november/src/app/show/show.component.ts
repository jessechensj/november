import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from './../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  question;
  answers = {answerstext:[]};
  questionid;

  constructor(
    private _route: ActivatedRoute,
    private _serviceService: ServiceService,
    private _router : Router
  ) { 
  }

  ngOnInit() {
    this._route.paramMap.subscribe( params => {
      this.questionid=params.get("id")
      this._serviceService.getOneQuestion(params.get('id'), (response) => {this.question = response});
      this._serviceService.getAnswers(params.get('id'), (response) => {this.answers = response});
    })
  }

  like(id){
    this._serviceService.like(id, () => {
      this._serviceService.getAnswers(this.questionid, (response) => {this.answers = response});
    });
    this.answers.answerstext.sort((a, b)=>b.likes-a.likes);
		this._serviceService.update(this.answers, res=>{});
  }

  logout(){
    this._serviceService.logout();
  }
}

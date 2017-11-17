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
  answers;

  constructor(
    private _route: ActivatedRoute,
    private _serviceService: ServiceService,
    private _router : Router
  ) { 
    this._route.paramMap.subscribe( params => {
      this._serviceService.getOneQuestion(params.get('id'), (response) => {this.question = response});
      this._serviceService.getAnswers(params.get('id'), (response) => {this.answers = response});
    })
  }

  ngOnInit() {
  }

}

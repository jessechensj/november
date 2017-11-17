import { Component, OnInit } from '@angular/core';
import { ServiceService } from './../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {

  obj = {
    question:'',
    description:'',
    answers: 0
  }

  constructor(
    private _serviceService: ServiceService,
    private _router : Router
  ) { }

  ngOnInit() {
  }

  submitQuestion(){
    this._serviceService.saveQuestion(this.obj, (res)=>{
      this.obj = {question:'',description:'',answers: 0};
			this._router.navigate(['/landing']);
    });
  }
}

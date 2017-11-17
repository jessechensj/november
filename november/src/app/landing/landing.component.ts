import { Component, OnInit } from '@angular/core';
import { ServiceService } from './../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  name=this._serviceService.name
  questions = []

  constructor(
    private _serviceService: ServiceService,
    private _router : Router
  ) { }

  ngOnInit() {
    this._serviceService.getQuestions(
      (response) => {this.questions = response.reverse()}
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { ServiceService } from './../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username = '';

  constructor(
    private _serviceService: ServiceService,
    private _router : Router
  ) { }

  ngOnInit() {
  }

  login(){
    console.log('login()')
    this._serviceService.login(this.username);
    this._router.navigate(['/landing']);
  }
}

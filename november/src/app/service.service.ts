import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import { Router } from '@angular/router';

@Injectable()
export class ServiceService {

  name = '';
  questions = [];
  answers;
  constructor(
    private _http: Http,
    private _router: Router
  ) { }

  login(username) {
    this.name = username;
    this._http.post(`/`, {name: username}).subscribe( 
      (response) => { console.log('logged in') },
      (error) => {console.log(error)}
    )
  }

  saveQuestion(obj, callback){
    this._http.post('/create', obj).subscribe( 
      (res)=>{
        callback(res.json());
        console.log('done with saveQuestion(): success')
			},
			(err)=>{
				console.log(err);
        console.log('done with saveQuestion(): error')
      }
    )
  }

  saveAnswer(obj, callback){
    this._http.post('/create_answer', obj).subscribe( 
      (res)=>{
        callback(res.json());
        console.log('done with saveAnswer(): success')
			},
			(err)=>{
				console.log(err);
        console.log('done with saveAnswer(): error')
      }
    )
  }

  getQuestions(callback) {
    this._http.get(`/questions`).subscribe( 
      (response) => { this.questions = response.json(); callback(response.json());},
      (error) => {console.log(error)}
    )
  }

  getAnswers(id, callback){
    this._http.get(`/question/`+id).subscribe( 
      (response) => { this.answers = response.json(); callback(response.json());},
      (error) => {console.log(error)}
    )
  }
  
  getOneQuestion(id, callback) {
    this._http.get('/one_question/'+id).subscribe( 
      (response) => { this.questions = response.json(); callback(response.json());},
      (error) => {console.log(error)}
    )
  }

  like(id, callback){
    this._http.post('/like', {id: id}).subscribe( 
      (res)=>{
        console.log('done with like(): success')
        callback()
			},
			(err)=>{
				console.log(err);
      }
    )
  }

  update(obj, callback){
		this._http.put('/update/'+obj._id, obj).subscribe(
			(res)=>{
        callback(res.json())
      },
			(err)=>{
        callback(err.json())
      }
		)
  }
  
  logout(){
    this.name = ''
    this._router.navigate(['/'])
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 

@Injectable()
export class ServiceService {

  name = '';
  questions = [];
  answers;
  constructor(private _http: Http) { }

  login(username) {
    this.name = username;
    this._http.post(`/`, {name: username}).subscribe( 
      (response) => { console.log('logged in') },
      (error) => {console.log(error)}
    )
  }

  saveQuestion(obj, callback){
    console.log(obj, 'in saveQuestion()');
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
    console.log(obj, 'in saveAnswer()');
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
}

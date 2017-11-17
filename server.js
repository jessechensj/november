var express = require("express");

var session = require("express-session");

var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quotes');

var Schema = mongoose.Schema;

var QuestionSchema = new mongoose.Schema({
    question: {type: String, required: true, minlength: 10},
    description: {type: String},
    answers: {type: Number},
    answerstext: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
   });
mongoose.model('Question', QuestionSchema); 

var Question = mongoose.model('Question') 

var AnswerSchema = new mongoose.Schema({
    _question: {type: Schema.Types.ObjectId, ref: 'Question'},
    answer: { type: String, required: true, minlength: 5 },
    details: { type: String },
    likes: {type: Number}
   });
mongoose.model('Answer', AnswerSchema);

var Answer = mongoose.model('Answer');

var bodyParser = require('body-Parser');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(session({secret: 'key'}));

const path = require('path'); 

app.use(express.static(path.join(__dirname, '/november/dist')));

// app.get('/', function(req, res){
//     res.render('index')
// });

app.post('/create', (req, res, next)=>{
        console.log('in create question')
        console.log(req.body)
        var question = new Question(req.body);
        
        question.save(function(err){
            if(err){
                console.log('something went wrong with creation');
                res.json('landing')
            }
            else{
                console.log('success');
                res.json('landing')
            }
        })
});

app.post('/create_answer', (req, res, next)=>{
    console.log('in create answer')
    console.log(req.body)

    var answer = new Answer(req.body);
    
    answer.save(function(err){
        if(err){
            console.log('something went wrong with creation');
            res.json('landing')
        }
        else{
            console.log('success');
            res.json('landing')
        }
    })
});

app.post('/', (req, res, next)=>{
    req.session.name = req.body.name;
    console.log(req.session.name);
    console.log('from login post req')
    res.json('landing');
});

app.get('/questions', (req, res, next)=>{
    console.log('in get all questions');
    Question.find({}, function(err, data) {
        if(err){
            console.log('something went wrong');
        }
        else{
            res.json(data);
        }
    });
})

app.get('/question/:id', function (req, res){
    console.log('getting answers')
    Question.findOne({_id: req.params.id})
    .populate('answers')
    .exec(function(err, answers) {
        res.json(answers);
    });
});

app.get('/one_question/:id', (req, res, next)=>{
    console.log('in get one question');
    console.log(req.params.id)
    Question.find({_id: req.params.id}, function(err, data) {
        if(err){
            console.log('something went wrong');
        }
        else{
            res.json(data);
        }
    });
})

// app.all("*", (req,res,next) => {
//     console.log(req.session.name);
//     console.log('from redirect')
//     res.sendFile(path.resolve("./november/dist/index.html"))
// });

app.listen(8000, function(){
    console.log("listening on 8000");
})
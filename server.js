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
    user: {type: String, required: true},
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
    Question.findOne({_id: req.body._question}, function(err, question){
        var answer = new Answer(req.body);
        question.answers += 1;
        answer.save(function(err){
            if(err){
                console.log('something went wrong with creation');
                res.json('landing')
            }
            else{
                question.answerstext.push(answer);
                question.save(function(err){
                    console.log('saved successfully');
                })
                console.log('success');
                res.json('landing')
            }
        })
    })
});

app.post('/', (req, res, next)=>{
    req.session.name = req.body.name;
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
    .populate('answerstext')
    .exec(function(err, answers) {
        if(err){
            res.json(err);
        }
        else{
            res.json(answers);
        }
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

app.post('/like', (req, res, next)=>{
    console.log(req.body.id)
    Answer.findOneAndUpdate({_id: req.body.id}, {$inc:{likes: 1}}, function(err, answer){
        if (err){
            console.log(err)
        }
        else{
            console.log(answer)
            res.json(answer)
        }
    })
})

app.put("/update/:id", (req, res, next)=>{
	Question.findByIdAndUpdate(req.params.id, req.body, function(err, question){
		res.json(question);
	});
});
// app.all("*", (req,res,next) => {
//     console.log(req.session.name);
//     console.log('from redirect')
//     res.sendFile(path.resolve("./november/dist/index.html"))
// });

app.listen(8000, function(){
    console.log("listening on 8000");
})
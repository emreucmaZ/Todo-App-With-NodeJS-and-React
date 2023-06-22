var express = require('express');
var app = express();
var pool = require('./database');
var { getTodos, getTodo, postTodo, deleteTodo, updateTodo } = require('./controllers/todoController');

app.use(express.json())


// CORS ayarları
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.get('/',(req,res)=>{
    res.send('Sunucu')
})

app.post('/todos',(req,res)=>postTodo(req,res))
app.delete('/todos/:id',(req,res)=>deleteTodo(req,res))
app.put('/todos/:id',(req,res)=>updateTodo(req,res))

app.get('/todos/:id',(req,res)=>getTodo(req,res))
app.get('/todos',(req,res)=>getTodos(req,res))

app.listen(5000,()=>{
    console.log("5000 portu çalıştı");
})
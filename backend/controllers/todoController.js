const { json } = require("body-parser")
const pool = require("../database")
const getDate = require("../helpers/getDate")

function getTodos(req, res) {
    pool.query(`select * from todos`, (err, result, fields) => {
        if (err) {
            return res.status(err.code).send(err.sqlMessage)
        }
        const filteredResult = result.filter(x => x.creationDate = getDate(x.creationDate))
        
        return res.status(200).json(filteredResult)
    })
}

function getTodo(req, res) {
    const {id} = req.params

    pool.query(`select * from todos where id = ${id}`,(err,result,fields)=>{
        if (err) {
            return res.status(err.code).send(err.sqlMessage)
        }
        console.log("fields");
        
        result[0].creationDate = getDate(result[0].creationDate);
       
        return res.status(200).json(result[0])
    })
}

function postTodo(req,res){
     pool.query(`INSERT INTO todos (title,description) VALUES ('${req.body.title}','${req.body.description}')`,(err,result,fields)=>{
         if (err) {
             return res.status(404).send(err.sqlMessage)
         }
      
         res.status(200).send(result)
     })
}

function updateTodo(req,res){
    const {id} = req.params;

    pool.query(`UPDATE todos
    SET title = '${req.body.title}', description = '${req.body.description}'
    WHERE id = ${id}`,(err,result,fields)=>{
        if (err) {
            return res.status(404).send(err.sqlMessage)
        }
     
        res.status(200).send(result)
    })
}

function deleteTodo(req,res){
    const {id} = req.params;

    pool.query(`DELETE FROM todos WHERE id='${id}';`,(err,result,fields)=>{
        if (err) {
            return res.status(404).send(err.sqlMessage)
        }
     
        res.status(200).send(result)
    })
}

module.exports = {
    getTodos,
    getTodo,
    postTodo,
    deleteTodo,
    updateTodo
}
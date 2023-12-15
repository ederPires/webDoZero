const express = require('express');
const router = express.Router();
const Task = require("./model/Task");

// Defina suas rotas usando router.get, router.post, etc.
//Retorna tarefas com paginaçã e ordenação
router.get("/tasks", (req,res) => {
  const{page = 1, limit = 10} = req.query;
  Task.findAll({
    offset:(page -1)*limit,
    limit:+limit,
    order:[
      ['updatedAt','desc']
    ]
  }).then((tasks)=>{
    res.json(tasks);
  })
})

//Consultando tarefa por id
router.get("/tasks/:id", async(req,res) =>{
  try{
    const task = await Task.findByPk(req.params.id);
    if(!task){
      res.status(404).json({
        success:false,
        message:"Tarefa não encontrada",
      });
    }else{
      res.json({
        success:true,
        task:task,
      });
    }
  }catch(error){
    res.status(500).json({
      success: false,
      message:error.message,
    });
  }
});

//Inserindo nova tarefa

module.exports = router;

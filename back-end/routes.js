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
router.post("/task", async (req,res) => {
  try {
    const task = new Task({
      description: req.body.description,
    });
      await task.save();
      res.status(201).json({
        success:true,
        message: "Tarefa criada com sucesso!",
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message: error.message,
    });
  }
});

//Atualizando uma tarefa
router.put('/tasks/:id', async (req,res)=> {
  try {
    const task = await Task.findByPk(req.params.id);
    if(!task){
      res.status(400).json({
        success:false,
        message:'A Tarefa que você quer atualizar não existe',
      });
      } else {
        await task.update({
          description: req.body.description,
        });
        res.json({
          success:true,
          message:"Tarefa atualizada com sucesso!",
        })
      }

  } catch (error) {
    res.status(500).json({
      success: false,
      message:error.message,
    })
  }
});

//Excluindo uma tarefa
router.delete('/tasks/:id',async (req,res)=>{
  try {
    const task = await Task.findByPk(req.params.id);
    if(!task){
      res.status(404).json({
        success: false,
        message:"Tarefa não encontrada",
      });
    } else {
      await task.destroy();
      res.json({
        success: true,
        message:"Tarefa excluída com sucesso!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;

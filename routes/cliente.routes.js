const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');

//Criando um cliente
router.post('/inserindoCliente', async (req, res) => {
    const { id, id_filial, nome, cpf_cnpj} = req.body
  
    const cliente = {
        id,
        id_filial,
        nome,
        cpf_cnpj,   
    }
    try {
      await Cliente.create(cliente)
  
      res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
});

//Buscar a lista de clientes
router.get('/listaCliente', async (req, res) => {

    try{

        const cliente = await Cliente.find({});
        res.json({ error: false, cliente})

    }catch (err){
        res.json({error: true, mensage: err.message})
    }
});

//Filtro de clientes que mais abrem atendimento 
router.get('/atendimento', async (req, res) => {
    try{
        const atendimento = await atendimentos.aggregate([
            {$match:{ date:{
                    $gte: new Date("2022-01-11T00:00:00.00Z"),
                    $lte: new Date("2022-04-04T00:00:00.00Z")},
                id_cliente:{$exists:true, $nin:["", null]}
            }},
            { $group: {_id: "$id_cliente",Cliente : {$first:"$id_cliente" },
                    count:{"$sum": 1} }
            },
            { $lookup:{ from: 'clientes',localField: '_id',foreignField: '_id',
                  as: 'cliente'}},{$unwind: "$cliente" },
            {"$project":{"_id":0,"nome":"$cliente.nome","quantidadeAtendimentos":"$count"}
                },{$sort:{"quantidadeAtendimentos": -1}}]).limit(15) ;                
        res.json({ error: false, atendimento})         
    
    }catch (err){
        res.json({error: true, mensage: err.message})
    }
    
});

//Deletar um cliente
router.delete('/person/:id', async (req, res) => {
    const id = req.params.id
  
    const cliente = await Cliente.findOne({ _id: id })
  
    if (!cliente) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
  
    try {
      await Cliente.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
});

//Update cliente 
router.patch('/person/:id', async (req, res) => {
    const id = req.params.id
  
    const { id_filial, nome, cpf_cnpj } = req.body
  
    const cliente = {
        id_filial,
        nome,
        cpf_cnpj,   
    }
  
    try {
      const updatedCliente = await Cliente.updateOne({ _id: id }, cliente)
  
      if (updatedCliente.matchedCount === 0) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
      }
  
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
});
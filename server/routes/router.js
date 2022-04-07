const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

route.get('/', services.homeRoutes);
route.get('/add-user', services.add_user);
route.get('/update-user', services.update_user);

//API
//Criando um cliente
route.post('/api/users', controller.create);

//Buscar a lista de clientes
route.get('/api/users', controller.find);

/*//Filtro de clientes que mais abrem atendimento 
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
    
});*/

//Deletar um cliente
route.delete('/api/users/:id', controller.delete);

//Update cliente 
route.put('/api/users/:id', controller.update);

module.exports = route
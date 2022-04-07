const Cliente = require('../model/cliente');


module.exports = class ToughController {
      static async inserindoCliente(req, res) {
        const name = req.body.name
        const cod = req.body.cod
        const description = req.body.description
        const image = req.body.image

    const cliente = new Cliente({ name, cod, description, image })


    res.redirect('/create')
        try {
          await cliente.save()
      
          res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
        } catch (error) {
          res.status(500).json({ erro: error })
        }   
      }
    
      static async listaCliente(req, res) {
        try{

          const cliente = await Cliente.find({});
          res.json({ error: false, cliente})
  
      }catch (err){
          res.json({error: true, mensage: err.message})
      }
       
      }
    
      static async removeCliente(req, res) {
      
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
        }
      
        static async updateCliente(req, res) {
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
        
        }
}

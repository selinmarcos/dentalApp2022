const Odonto = require('../model/Odonto')

const createOdonto =  async (req, res) => {
    const lugar = req.body.lugar
    console.log(lugar)
    try {
    
    const odont = new Odonto({
        lugar: req.body.lugar,
        numero: req.body.numero,
        tipo: req.body.tipo,
        valor: req.body.valor,
    })

    const result = await odont.save()

    const {pass, ...data} = await result.toJSON()

    res.send(data)
        
    } catch (error) {
        console.log(error)
        
    }
    
}

module.exports = {createOdonto}
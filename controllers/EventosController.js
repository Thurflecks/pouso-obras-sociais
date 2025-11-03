const EventosModel = require('../models/Eventos')
module.exports = class EventosController {
    static async index(req, res) {
        try {
            const eventos = await EventosModel.findAll({
                order: [['prazo', 'ASC']]
            })
            const eventoPrincipal = {
                ...eventos[0].dataValues,
                prazo: eventos[0].prazo.split('T')[0].split('-').reverse().join('/')
            }
            const eventosAjeitados = eventos.slice(1).map(evento => {
                return {
                    ...evento.dataValues,
                    prazo: evento.prazo.split('T')[0].split('-').reverse().join('/')
                }
            })
            res.render('eventos/eventos', { eventosAjeitados, eventoPrincipal })
        } catch (error) {
            console.log(error)
            res.status(500);
        }
    }
    static async editar(req, res) {
        try {
            res.render('eventos/edicao')
        } catch (error) {
            console.log(error)
            res.status(500);
        }
    }
}
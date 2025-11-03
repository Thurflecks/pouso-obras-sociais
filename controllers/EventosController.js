const EventosModel = require('../models/Eventos')

module.exports = class EventosController {
    static async index(req, res) {
        try {
            const eventos = await EventosModel.findAll({
                order: [['prazo', 'ASC']]
            })

            const eventosAjeitados = eventos.map(evento => {
                const foto = evento.foto ? evento.foto.toString('base64') : null
                return {
                    ...evento.dataValues,
                    data: evento.prazo.split('T')[0].split('-').reverse().join('/'),
                    horario: evento.horario.substring(0, 5),
                    foto
                }
            })

            const eventoPrincipal = eventosAjeitados.length > 0 ? eventosAjeitados[0] : null

            res.render('eventos/eventos', { eventosAjeitados: eventosAjeitados.slice(1), eventoPrincipal })
        } catch (error) {
            console.log(error)
            res.status(500).send('Erro interno do servidor')
        }
    }

    static async listar(req, res) {
        try {
            const eventos = await EventosModel.findAll({
                order: [['prazo', 'ASC']]
            })
            const eventosAjeitados = eventos.map(evento => {
                const foto = evento.foto ? evento.foto.toString('base64') : null
                return {
                    ...evento.dataValues,
                    data: evento.prazo.split('T')[0].split('-').reverse().join('/'),
                    foto
                }
            })
            res.render('admin/eventos/listar', { eventos: eventosAjeitados })
        } catch (error) {
            console.log(error)
            res.redirect('/admin')
        }
    }

    static async criar(req, res) {
        try {
            res.render('admin/eventos/criar')
        } catch (error) {
            console.log(error)
            res.redirect('/admin')
        }
    }

    static async criarPost(req, res) {
        try {
            const { nome, horario, diaSemana, prazo } = req.body
            const foto = req.file ? req.file.buffer : null
            await EventosModel.create({ nome, horario, diaSemana, prazo, foto })
            res.redirect('/admin/eventos')
        } catch (error) {
            console.log(error)
            res.redirect('/admin')
        }
    }

    static async editar(req, res) {
        try {
            const evento = await EventosModel.findByPk(req.params.id)
            if (!evento) {
                return res.redirect('/admin/eventos')
            }
            const foto = evento.foto ? evento.foto.toString('base64') : null
            const horario = evento.horario.substring(0, 5)
            const data = evento.prazo.split('T')[0]
            res.render('admin/eventos/editar', { evento: { ...evento.dataValues, foto, horario, data } })
        } catch (error) {
            console.log(error)
            res.redirect('/admin/eventos')
        }
    }

    static async editarPost(req, res) {
        try {
            const { nome, horario, diaSemana, prazo } = req.body
            const foto = req.file ? req.file.buffer : null
            const evento = await EventosModel.findByPk(req.params.id)
            if (!evento) {
                return res.redirect('/admin/eventos')
            }
            await evento.update({ nome, horario, diaSemana, prazo, foto })
            res.redirect('/admin/eventos')
        } catch (error) {
            console.log(error)
            res.redirect('/admin/eventos')
        }
    }

    static async deletar(req, res) {
        try {
            const evento = await EventosModel.findByPk(req.params.id)
            if (evento) {
                await evento.destroy()
            }
            res.redirect('/admin/eventos')
        } catch (error) {
            console.log(error)
            res.redirect('/admin/eventos')
        }
    }
}
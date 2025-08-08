module.exports = class EventosController {
    static index (req, res) {
        try {
            res.render('eventos/eventos')
        } catch (error) {
            console.log(error)
            res.status(500);
        }
    }
}
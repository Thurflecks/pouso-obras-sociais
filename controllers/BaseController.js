//import models

module.exports = class BaseController {
    static home(req, res) {
        try {
            res.render('base/home')
        } catch (error) {
            console.log(error, 'erro ao renderizar a página inicial');
            res.status(500).redirect('/');
        }
    }
    static notFound(req, res) {
        try {
            res.render('base/404')
        } catch (error) {
            console.log(error, 'erro ao renderizar a página inicial');
            res.status(500).redirect('/');
        }
        
    }
}
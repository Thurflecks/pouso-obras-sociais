//import models

module.exports = class MainController {
    static home(req, res) {
        res.send('Hello World');
    }
    static base(req, res) {
        res.render('cadastro');
    }
}
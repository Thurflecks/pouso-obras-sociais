//import models

module.exports = class MainController {
    static home(req, res) {
        res.render('home');
    }
    static base(req, res) {
        res.send('site em construção');
    }
}
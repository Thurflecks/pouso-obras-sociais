//import models

module.exports = class BaseController {
    static home(req, res) {
        res.render('base/home')
    }
}
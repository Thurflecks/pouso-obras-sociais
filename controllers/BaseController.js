//import models

const Scroller = require('../models/Scroller');

module.exports = class BaseController {
    static async home(req, res) {
        try {
            const scrollers = await Scroller.findAll({ raw: true });

            // Convert blob to base64
            const scrollersWithBase64 = scrollers.map(scroller => {
                if (scroller.image) {
                    scroller.image = Buffer.from(scroller.image).toString('base64');
                }
                return scroller;
            });

            res.render('base/home', { scrollers: scrollersWithBase64 });
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
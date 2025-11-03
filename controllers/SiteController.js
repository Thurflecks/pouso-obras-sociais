module.exports = class SiteController {
    static async showHome(req, res) {
        try {
            res.render('admin/site/editar');
        } catch (error) {
            console.log(error);
        }
    }
}
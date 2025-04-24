const AdminModel = require('../models/Admin');

module.exports = class AdminController {
    static login(req, res) {
        try {
            res.render('admin/loginAdmin');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página de login');
        }

    }
    static async loginAcess(req, res) {
        try {
            const { email, senha } = req.body;
            await AdminModel.findOne({
                where: { email: email, senha: senha }
            }).then((admin) => {
                req.session.user = {
                    id: admin.id_admin,
                    email: admin.email,
                }
                res.redirect("/")
            }).catch(erro => {
                console.log(erro, 'erro ao realizar o login')
                res.render('admin/loginAdmin', { error: 'Email ou senha incorretos' });
            })
        } catch (error) {
            console.log(error, 'erro ao realizar o login');
            res.render('admin/loginAdmin', { error: 'Email ou senha incorretos' });
        }
    }

}
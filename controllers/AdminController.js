const AdminModel = require('../models/Admin');

module.exports = class AdminController {
    static async homeAdmin(req, res) {
        try {
            const emailUser = req.session.user.email;
            res.render('admin/admin', { emailUser });
        } catch (error) {
            console.log(error, 'erro ao renderizar a página inicial');
        }
    }
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
                res.redirect("/admin")
            }).catch(erro => {
                console.log(erro, 'erro ao realizar o login')
                res.render('admin/loginAdmin', { error: 'Email ou senha incorretos' });
            })
        } catch (error) {
            console.log(error, 'erro ao realizar o login');
            res.render('admin/loginAdmin', { error: 'Email ou senha incorretos' });
        }
    }
    static logout(req, res) {
        req.session.destroy();
        res.redirect('/admin/login');
    }

}
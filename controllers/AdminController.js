const AdminModel = require('../models/Admin');
const AdminLoginModel = require('../models/AdminLogins');


module.exports = class AdminController {
    static async homeAdmin(req, res) {
        try {
            const cpfUser = req.session.user.cpf;
            res.render('admin/admin', { cpfUser });
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
            const { cpf, senha } = req.body;
            await AdminModel.findOne({
                where: { cpf: cpf, senha: senha }
            }).then((admin) => {
                req.session.user = {
                    id: admin.id_admin,
                    cpf: admin.cpf,
                    nivel: admin.nivel
                }
                AdminLoginModel.create({
                    cpf_admin: cpf,
                    ip_address: req.ip
                })
                res.redirect("/admin")
            }).catch(erro => {
                console.log(erro, 'erro')
                res.render('admin/loginAdmin', { error: 'CPF ou senha incorretos' });
            })
        } catch (error) {
            console.log(error, 'erro ao realizar o login');
            res.render('admin/loginAdmin', { error: 'CPF ou senha incorretos' });
        }
    }
    static logout(req, res) {
        req.session.destroy();
        res.redirect('/admin/login');
    }

}
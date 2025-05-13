const AdminModel = require('../models/Admin');
const AdminLoginModel = require('../models/AdminLogins');


module.exports = class AdminController {
    static async homeAdmin(req, res) {
        try {
            const cpfUser = req.session.user.cpf;
            res.render('admin/admin', { cpfUser });
        } catch (error) {
            console.log(error, 'erro ao renderizar a página inicial');
            res.redirect('/admin/login');
        }
    }
    static login(req, res) {
        try {
            res.render('admin/loginAdmin');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página de login');
            res.redirect('/');
        }
    }

    static async loginAccess(req, res) {
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
                req.flash('message', 'CPF ou senha incorretos');
                res.render('admin/loginAdmin');

                return;
            })
        } catch (error) {
            console.log(error, 'erro ao realizar o login');
            res.redirect('/admin');
        }
    }
    static register(req, res) {
        try {
            res.render('admin/register');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página de registro');
            res.redirect('/admin/login');
        }
    }
    static async registerAccess(req, res) {
        try {
            const { cpf, senha, confirmeSenha, nivel } = req.body;
            if (senha !== confirmeSenha) {
                req.flash('message', 'As senhas não coincidem');
                return res.render('admin/register');
            }
            const admin = await AdminModel.findOne({ where: { cpf: cpf } });
    
            if (admin) {
                req.flash('message', 'CPF já cadastrado');
                return res.render('admin/register');
            }
            await AdminModel.create({ cpf, senha, nivel });
    
            res.redirect('/admin/login');
        } catch (error) {
            console.log(error, 'Erro ao cadastrar o admin');
            req.flash('message', 'Erro inesperado! Tente novamente.');
            res.render('admin/register');
        }
    }
    
    static logout(req, res) {
        req.session.destroy();
        res.redirect('/admin/login');
    }

}
const AdminModel = require('../models/Admin');
const AdminLoginModel = require('../models/AdminLogins');
const bcrypt = require('bcryptjs');


module.exports = class AdminController {
    static async homeAdmin(req, res) {
        try {
            res.render('admin/admin');
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

    static async loginPost(req, res) {
        try {
            const { cpf, senha } = req.body;
            const admin = await AdminModel.findOne({ where: { cpf: cpf } });
            if (!admin) {
                req.flash('message', 'CPF ou senha incorretos');
                return res.render('admin/loginAdmin');
            }
            const senhaCorreta = await bcrypt.compare(senha, admin.senha);

            if (!senhaCorreta) {
                req.flash('message', 'CPF ou senha incorretos');
                return res.render('admin/loginAdmin');
            }
            req.session.user = {
                id: admin.id_admin,
                cpf: admin.cpf,
                nivel: admin.nivel
            };
            await AdminLoginModel.create({
                cpf_admin: cpf,
                ip_address: req.ip
            });

            res.redirect("/admin");

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
    static async registerPost(req, res) {
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
            const salt = bcrypt.genSaltSync(10);
            const senhaHash = bcrypt.hashSync(senha, salt);

            await AdminModel.create({ cpf, senha: senhaHash, nivel });

            res.redirect('/admin/login');
        } catch (error) {
            console.log(error, 'Erro ao cadastrar o admin');
            req.flash('message', 'Erro inesperado! Tente novamente.');
            res.render('admin/register');
        }
    }
    static async relatorio(req, res) {
        try {
            res.render('admin/relatorio');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página de relatorio');
            res.redirect('/admin/login');
        }
    }
    static async edit(req, res) {
        try {
            res.render('admin/edit');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página de edição');
            res.redirect('/admin/login');
        }
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/admin/login');
    }

}
const AdminModel = require('../models/Admin');
const AdminLoginModel = require('../models/AdminLogins');
const Scroller = require('../models/Scroller');
const bcrypt = require('bcryptjs');

module.exports = class AdminController {
    static async homeAdmin(req, res) {
        try {
            res.render('admin/admin');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página inicial');
            res.status(500).redirect('/admin/login');
        }
    }

    static login(req, res) {
        try {
            res.render('admin/loginAdmin');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página de login');
            res.status(500).redirect('/');
        }
    }

    static async loginPost(req, res) {
        try {
            const { cpf, senha } = req.body;
            const admin = await AdminModel.findOne({ where: { cpf: cpf } });

            if (!admin) {
                req.flash('message', 'CPF ou senha incorretos!');
                return res.status(401).redirect('/admin/login');
            }

            const senhaCorreta = await bcrypt.compare(senha, admin.senha);

            if (!senhaCorreta) {
                req.flash('message', 'CPF ou senha incorretos!');
                return res.status(401).redirect('/admin/login');
            }

            req.session.user = {
                id: admin.id_admin,
                cpf: admin.cpf,
                nivel: admin.nivel,
                nome: admin.nome
            };

            await AdminLoginModel.create({
                cpf_admin: cpf,
                ip_address: req.ip,
                nome_admin: admin.nome,
            });

            res.redirect("/admin");
        } catch (error) {
            console.log(error, 'erro ao realizar o login');
            req.flash('message', 'Erro ao realizar o login!');
            res.status(500).redirect('/admin/login');
        }
    }

    static register(req, res) {
        try {
            res.render('admin/register');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página de registro');
            res.status(500).redirect('/admin');
        }
    }

    static async registerPost(req, res) {
        try {
            const { cpf, nome, senha, confirmeSenha, nivel } = req.body;

            if (senha !== confirmeSenha) {
                req.flash('message', 'As senhas não coincidem!');
                return res.status(400).render('admin/register');
            }

            const admin = await AdminModel.findOne({ where: { cpf: cpf } });

            if (admin) {
                req.flash('message', 'CPF já cadastrado!');
                return res.status(409).render('admin/register');
            }

            const salt = bcrypt.genSaltSync(10);
            const senhaHash = bcrypt.hashSync(senha, salt);

            await AdminModel.create({ cpf, nome, senha: senhaHash, nivel });

            res.redirect('/admin/login');
        } catch (error) {
            console.log(error, 'Erro ao cadastrar o admin');
            req.flash('message', 'Erro inesperado! Tente novamente.');
            res.status(500).render('admin/register');
        }
    }

    static async relatorio(req, res) {
        try {
            const formatter = new Intl.DateTimeFormat('fr-CA', {
                timeZone: 'America/Sao_Paulo',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const data = formatter.format(new Date());
            res.render('admin/relatorio', { data });
        } catch (error) {
            console.log(error, 'erro ao renderizar a página de relatorio');
            res.status(500).redirect('/admin');
        }
    }

    static async edit(req, res) {
        try {
            res.render('admin/edit');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página de edição');
            res.status(500).redirect('/admin');
        }
    }
    static async editPost(req, res) {
        try {
            const { senhaAtual, senhaNova, confirmeSenha } = req.body;
            const admin = await AdminModel.findOne({ where: { id_admin: req.session.user.id } });
            const senhaAntiga = await bcrypt.compare(senhaAtual, admin.senha);
            if (!senhaAntiga) {
                req.flash('message', 'Senha atual incorreta!');
                return res.status(401).redirect('/admin/edit');
            }
            if (senhaNova !== confirmeSenha) {
                req.flash('message', 'As senhas não coincidem!');
                return res.status(400).redirect('/admin/edit');
            }
            const salt = bcrypt.genSaltSync(10);
            const senhaHash = bcrypt.hashSync(senhaNova, salt);
            await AdminModel.update({ senha: senhaHash }, { where: { id_admin: req.session.user.id } }).then(() => {
                req.flash('message', 'Senha atualizada com sucesso!');
                res.redirect('/admin');
            }).catch((error) => {
                console.log(error, 'erro ao atualizar a senha');
                req.flash('message', 'Erro ao atualizar a senha!');
                res.redirect('/admin/edit');
            });
        } catch (error) {
            console.log(error, 'erro ao atualizar a senha');
            res.status(500).redirect('/admin/edit');
        }
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }

    static async scroller(req, res) {
        const scrollers = await Scroller.findAll({ raw: true });

        const scrollersWithBase64 = scrollers.map(scroller => {
            if (scroller.image) {
                scroller.image = Buffer.from(scroller.image).toString('base64');
            }
            return scroller;
        });

        res.render('admin/scroller', { scrollers: scrollersWithBase64 });
    }

    static async scrollerPost(req, res) {
        const image = req.file.buffer;
        await Scroller.create({ image });
        res.redirect('/admin/scroller');
    }

    static async scrollerDelete(req, res) {
        const id = req.body.id;
        await Scroller.destroy({ where: { id: id } });
        res.redirect('/admin/scroller');
    }
}
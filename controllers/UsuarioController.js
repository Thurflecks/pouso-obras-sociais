const { Op } = require('sequelize');
const UsuarioModel = require('../models/Usuario');

module.exports = class UsuarioController {
   static cadastro(req, res) {
      res.render('usuarios/cadastro');
   }
   static async add_cadastro(req, res) {
      try {
         const { nome, dataNascimento, telefone, cpf, identidade, endereco, bairro, cep, cidade, uf,
            local_trabalho, profissao, faixa_etaria, grau_instrucao, formacao_tecnica, num_pessoas, num_criancas,
            etnia, tipo_moradia, situacao_moradia, meio_transporte,
            participacao_economica, situacao_trabalhista, descricao_outro, renda_percapta,
            beneficio_social, qual_beneficio, cadastro_unico, necessidades_especiais, descricao_necessidade,
            medicacao_continua } = req.body
         await UsuarioModel.create({
            nome: nome,
            data_nasc: dataNascimento,
            telefone: telefone,
            cpf: cpf,
            rg: identidade,
            endereco: endereco,
            bairro: bairro,
            cep: cep,
            cidade: cidade,
            UF: uf,
            local_trabalho: local_trabalho,
            trabalho: profissao,
            faixa_etaria: faixa_etaria,
            escolaridade: grau_instrucao,
            form_tecnica: formacao_tecnica,
            qnt_membros_familia: num_pessoas,
            qnt_menor_idade: num_criancas,
            etnia: etnia,
            tipo_moradia: Array.isArray(tipo_moradia) ? tipo_moradia.join(', ') : tipo_moradia,
            situacao_moradia: situacao_moradia,
            transporte: meio_transporte === 'sim' ? 1 : 0,
            part_economica: participacao_economica,
            situacao_trabalho: situacao_trabalhista,
            renda_familia: renda_percapta,
            beneficio: beneficio_social === 'sim' ? 1 : 0,
            tipo_beneficio: qual_beneficio,
            cad_unico: cadastro_unico === 'sim' ? 1 : 0,
            nec_especial: necessidades_especiais === 'sim' ? 1 : 0,
            tipo_necessidade: descricao_necessidade,
            medi_continua: medicacao_continua === 'sim' ? 1 : 0
         })
         res.redirect('/user/')
      } catch (error) {
         console.log(error)
      }
   }
   static async index(req, res) {
      const search = String(req.query.search || "");
      let column = String(req.query.column || "");
      let order = 'ASC';
      if (req.query.order === 'old') {
         order = 'ASC';
      } else if (req.query.order === 'new') {
         order = 'DESC';
      }
      const usuarios = await UsuarioModel.findAll({
         where: {
            [column ? column : 'nome']: {
               [Op.like]: `%${search}%`
            }
         }, order: [['id_usuario', order]],
         raw: true
      });
      res.render('usuarios/index', { usuarios, search });
   }
   static async editar(req, res) {
      const id = req.params.id
      const usuario = await UsuarioModel.findByPk(id)
      res.render('usuarios/edicao', { usuario })
   }

   static async editarPost(req, res) {
      const id = req.params.id;
      try {
         await UsuarioModel.update(req.body, {
            where: { id_usuario: id }
         });
         res.redirect('/admin/usuarios');
      } catch (error) {
         console.log(error);
         res.redirect('back');
      }
   }
}
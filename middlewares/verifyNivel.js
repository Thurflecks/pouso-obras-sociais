function verifyNivel(niveisPermitidos) {
    return (req, res, next) => {
        const nivel = req.session.user.nivel
        if (niveisPermitidos.includes(nivel)) {
            next();
            return;
        } else {
            console.log("Não autorizado");
            req.flash('message', 'Você não tem permissão para fazer essa ação!');
            res.redirect(req.get("Referer"));
            return;
        }
    };
}

module.exports = verifyNivel
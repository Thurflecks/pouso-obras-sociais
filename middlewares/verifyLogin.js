function verifyLogin(req, res, next) {

    if (req.session.user && req.session.user.cpf) {
        res.redirect("/admin")
    } else {
        return next()

    }
}

module.exports = verifyLogin
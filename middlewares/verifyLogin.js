function verifyLogin(req, res, next) {

    if (req.session.user && req.session.user.email) {
        res.redirect("/admin")
    } else {
        return next()

    }
}

module.exports = verifyLogin
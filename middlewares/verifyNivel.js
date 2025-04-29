function verifyNivel(req, res, next) {
    if (req.session.user.nivel === 4) {
      return  next()
    } else {
        res.redirect("/admin")
        console.log("Não autorizado")
    }
}
module.exports = verifyNivel
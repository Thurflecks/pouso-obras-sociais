function verifyNivel(niveisPermitidos) {
  return (req, res, next) => {
      const  nivel  = req.session.user.nivel
      if (niveisPermitidos.includes(nivel)) {
          return next();
      } else {
          console.log("Não autorizado");
          return res.redirect("/admin?level=low");
      }
  };
}

module.exports = verifyNivel
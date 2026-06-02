module.exports = {
  validarAviso: (req, res, next) => {
    const { produtoNome, nome, email } = req.body;
    if (!produtoNome || !nome || !email) {
      return res.status(400).send("Preencha todos os campos para registrar o interesse.");
    }
    next();
  }
};

module.exports = {
  validarLogin: (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.render('index', { title: 'Login', erro: 'Preencha o e-mail e a senha!' });
    }
    next();
  },
  
  validarCadastro: (req, res, next) => {
    const { nome, email, telefone, password } = req.body;
    if (!nome || !email || !password || !telefone) {
      return res.render('cadastro', { title: 'Cadastro', erro: 'Preencha todos os campos obrigatórios!' });
    }
    next();
  }
};

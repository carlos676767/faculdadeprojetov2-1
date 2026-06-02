const authService = require('../services/authService');
const productService = require('../services/productService');
const notificationService = require('../services/notificationService');

const indexController = {
  renderIndex: function (req, res, next) {
    res.render('index', { title: 'Login' });
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const usuario = await authService.login(email, password);
      res.cookie('usuario_nome', usuario.nome, { maxAge: 24 * 60 * 60 * 1000 });
      res.redirect('/home');
    } catch (error) {
      return res.render('index', { title: 'Login', erro: error.message });
    }
  },

  renderCadastro: function (req, res, next) {
    res.render('cadastro', { title: 'Cadastro' });
  },

  cadastro: async (req, res) => {
    const { nome, email, telefone, password } = req.body;
    try {
      await authService.cadastro(nome, email, telefone, password);
      res.redirect('/');
    } catch (error) {
      res.render('cadastro', { title: 'Cadastro', erro: error.message });
    }
  },

  home: async function (req, res, next) {
    const usuario_nome = req.cookies.usuario_nome || null;
    const sucesso_mensagem = req.query.sucesso || null;
    const produtosLista = productService.getAllProdutos();

    try {
      const produtosDisponiveisNomes = productService.getProdutosDisponiveis().map(p => p.nome);
      const emailsEnviados = await notificationService.verificarEEnviarNotificacoesPendentes(produtosDisponiveisNomes);

      res.render('home', {
        title: 'Dashboard - Bar e Mercearia Silva',
        usuario_nome: usuario_nome,
        produtos: produtosLista,
        sucesso_mensagem: sucesso_mensagem,
        emailsEnviados: emailsEnviados
      });
    } catch (error) {
      console.error("Erro ao verificar notificações de e-mail:", error);
      res.render('home', {
        title: 'Dashboard - Bar e Mercearia Silva',
        usuario_nome: usuario_nome,
        produtos: produtosLista,
        sucesso_mensagem: sucesso_mensagem,
        emailsEnviados: []
      });
    }
  },

  avisarMe: async (req, res) => {
    const { produtoNome, nome, email } = req.body;
    try {
      await notificationService.cadastrarInteresse(produtoNome, nome, email);
      const msg = `Sucesso! Cadastramos o interesse de "${nome}" (${email}) no produto "${produtoNome}".`;
      res.redirect('/home?sucesso=' + encodeURIComponent(msg));
    } catch (error) {
      res.status(500).send("Erro ao registrar interesse no produto: " + error.message);
    }
  },

  logout: function (req, res) {
    res.clearCookie('usuario_nome');
    res.redirect('/');
  }
};

module.exports = indexController;

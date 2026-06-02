const authService = require('../services/authService');
const productService = require('../services/productService');
const notificationService = require('../services/notificationService');

const indexController = {
  // Página inicial (Login)
  renderIndex: function (req, res, next) {
    res.render('index', { title: 'Login' });
  },

  // Processar login
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const usuario = await authService.login(email, password);
      // Grava o nome do usuário em um cookie que dura 24 horas
      res.cookie('usuario_nome', usuario.nome, { maxAge: 24 * 60 * 60 * 1000 });
      // Redireciona para o dashboard (Home) após login bem sucedido
      res.redirect('/home');
    } catch (error) {
      return res.render('index', { title: 'Login', erro: error.message });
    }
  },

  // Página de Cadastro
  renderCadastro: function (req, res, next) {
    res.render('cadastro', { title: 'Cadastro' });
  },

  // Processar o Cadastro
  cadastro: async (req, res) => {
    const { nome, email, telefone, password } = req.body;
    try {
      await authService.cadastro(nome, email, telefone, password);
      // Após o cadastro, redireciona para o login (ou poderia ser /home)
      res.redirect('/');
    } catch (error) {
      res.render('cadastro', { title: 'Cadastro', erro: error.message });
    }
  },

  // Página Principal (Dashboard / Home)
  home: async function (req, res, next) {
    const usuario_nome = req.cookies.usuario_nome || null;
    const sucesso_mensagem = req.query.sucesso || null;
    const produtosLista = productService.getAllProdutos();

    try {
      // Busca nomes dos produtos que estão como Disponível na lista estática
      const produtosDisponiveisNomes = productService.getProdutosDisponiveis().map(p => p.nome);

      // Envia notificações para esses produtos, caso existam, e retorna os logs
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

  // Rota para Cadastrar Notificação de Produto Esgotado
  avisarMe: async (req, res) => {
    const { produtoNome, nome, email } = req.body;
    try {
      // Salva a solicitação no banco de dados usando o Service
      await notificationService.cadastrarInteresse(produtoNome, nome, email);

      // Redireciona com mensagem de sucesso
      const msg = `Sucesso! Cadastramos o interesse de "${nome}" (${email}) no produto "${produtoNome}".`;
      res.redirect('/home?sucesso=' + encodeURIComponent(msg));
    } catch (error) {
      res.status(500).send("Erro ao registrar interesse no produto: " + error.message);
    }
  },

  // Rota para Deslogar (Logout)
  logout: function (req, res) {
    res.clearCookie('usuario_nome');
    res.redirect('/');
  }
};

module.exports = indexController;

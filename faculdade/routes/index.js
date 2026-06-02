require('dotenv').config();
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const authRequest = require('../requests/authRequest');
const notificacaoRequest = require('../requests/notificacaoRequest');

/* Página inicial (Login) */
router.get('/', indexController.renderIndex);

/* Login */
router.post('/login', authRequest.validarLogin, indexController.login);

/* Página de Cadastro */
router.get('/cadastro', indexController.renderCadastro);

/* Processar o Cadastro */
router.post('/cadastro', authRequest.validarCadastro, indexController.cadastro);

/* Página Principal (Dashboard / Home) */
router.get('/home', indexController.home);

/* Rota para Cadastrar Notificação de Produto Esgotado */
router.post('/avisar-me', notificacaoRequest.validarAviso, indexController.avisarMe);

/* Rota para Deslogar (Logout) */
router.get('/logout', indexController.logout);

module.exports = router;
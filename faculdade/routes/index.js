require('dotenv').config();
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const authRequest = require('../requests/authRequest');
const notificacaoRequest = require('../requests/notificacaoRequest');

router.get('/', indexController.renderIndex);
router.post('/login', authRequest.validarLogin, indexController.login);
router.get('/cadastro', indexController.renderCadastro);
router.post('/cadastro', authRequest.validarCadastro, indexController.cadastro);
router.get('/home', indexController.home);
router.post('/avisar-me', notificacaoRequest.validarAviso, indexController.avisarMe);
router.get('/logout', indexController.logout);

module.exports = router;
const db = require('../models');

class AuthService {
  async login(email, password) {
    const usuario = await db.Usuario.findOne({ where: { email: email } });
    if (!usuario) {
      throw new Error('E-mail não cadastrado!');
    }
    if (usuario.senha !== password) {
      throw new Error('Senha incorreta!');
    }
    return usuario;
  }

  async cadastro(nome, email, telefone, password) {
    const usuarioExistente = await db.Usuario.findOne({ where: { email: email } });
    if (usuarioExistente) {
      throw new Error('Este e-mail já está cadastrado!');
    }

    const novoUsuario = await db.Usuario.create({
      nome: nome,
      email: email,
      senha: password,
      telefone: telefone
    });
    
    return novoUsuario;
  }
}

module.exports = new AuthService();

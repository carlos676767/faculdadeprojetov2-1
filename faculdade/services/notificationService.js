const db = require('../models');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "seu-email@gmail.com",
    pass: process.env.SMTP_PASS || "sua-senha-de-app-aqui"
  }
});

class NotificationService {
  async enviarEmailDeNotificacao(nome, email, produtoNome) {
    const mailOptions = {
      from: `"Bar e Mercearia Silva" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `🎉 Novidade! O produto "${produtoNome}" voltou ao estoque!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 25px; background-color: #FAF6F0; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #C3521F; margin-top: 0;">Olá, ${nome}!</h2>
          <p style="font-size: 16px; line-height: 1.6;">Você nos pediu para avisar e o estoque foi reabastecido! 😃</p>
          <p style="font-size: 16px; line-height: 1.6;">O produto <strong>"${produtoNome}"</strong> acaba de voltar ao estoque do <strong>Bar e Mercearia Silva</strong>.</p>
          <p style="font-size: 16px; line-height: 1.6;">Aproveite para garantir o seu clicando no botão abaixo:</p>
          <br>
          <div style="text-align: center;">
            <a href="http://localhost:3000" style="background-color: #C3521F; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Ir para a Mercearia</a>
          </div>
          <br>
          <hr style="border: none; border-top: 1px solid #e2e8f0;">
          <p style="font-size: 11px; color: #777; text-align: center;">Esta é uma notificação automática solicitada por você no nosso site.</p>
        </div>
      `
    };

    return transporter.sendMail(mailOptions);
  }

  async verificarEEnviarNotificacoesPendentes(produtosDisponiveisNomes) {
    let emailsEnviados = [];
    if (produtosDisponiveisNomes.length === 0) return emailsEnviados;

    const notificacoes = await db.Notificacao.findAll({
      where: {
        produtoNome: {
          [db.Sequelize.Op.in]: produtosDisponiveisNomes
        }
      }
    });

    if (notificacoes.length > 0) {
      for (const n of notificacoes) {
        const clienteNome = n.nome || "Cliente";
        try {
          await this.enviarEmailDeNotificacao(clienteNome, n.email, n.produtoNome);
          console.log(`\n\x1b[32m[EMAIL SUCCESS]\x1b[0m 📧 E-mail real enviado com sucesso para ${n.email} (${clienteNome})!`);
        } catch (mailError) {
          console.warn(`\n\x1b[33m[EMAIL REAL FALLBACK]\x1b[0m Não foi possível enviar o e-mail real para ${n.email} (${clienteNome}). SMTP não configurado. Erro:`, mailError.message);
        }

        emailsEnviados.push({
          nome: clienteNome,
          email: n.email,
          produtoNome: n.produtoNome
        });
      }

      await db.Notificacao.destroy({
        where: {
          id: {
            [db.Sequelize.Op.in]: notificacoes.map(n => n.id)
          }
        }
      });
    }

    return emailsEnviados;
  }

  async cadastrarInteresse(produtoNome, nome, email) {
    return await db.Notificacao.create({
      produtoNome: produtoNome,
      nome: nome,
      email: email
    });
  }
}

module.exports = new NotificationService();

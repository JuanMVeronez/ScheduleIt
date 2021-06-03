import path from 'path';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars'


const transport = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    }
});

transport.use('compile', hbs({
  viewEngine: 'handlebars',
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html',
}))
export default transport;
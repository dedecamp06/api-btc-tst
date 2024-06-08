import amqp from 'amqplib';
import nodemailer from 'nodemailer';

class EmailService {
  private transporter;
  private queueChannel: any;
  
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    this.initRabbitMQ();
  }

  async initRabbitMQ() {
    const connection = await amqp.connect('amqp://localhost'); 
    this.queueChannel = await connection.createChannel();
    await this.queueChannel.assertQueue('emailQueue', { durable: true });
  }

  async sendToQueue(mailOptions: { to: string, subject: string, body: string }) {
    this.queueChannel.sendToQueue('emailQueue', Buffer.from(JSON.stringify(mailOptions)), {
      persistent: true
    });
    console.log('Email job sent to queue');
  }
}

export const emailService = new EmailService();

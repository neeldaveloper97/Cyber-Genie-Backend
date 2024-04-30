import { connect } from 'amqplib/callback_api';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PaymentService } from './payment/payment.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8080);
  console.log('Microservice is listening');
}

connect(process.env.rabbitMQServerAddress, (err, connection) => {
  if (err) {
    throw err;
  }

  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }

    let paymentQueueName = 'payment_queue';
    let paymentStatusQueueName = 'payment_status_queue';

    channel.assertQueue(paymentQueueName, {
      durable: false,
    });

    console.log(
      'Waiting for payment requests in %s. To exit, press CTRL+C',
      paymentQueueName,
    );

    channel.consume(paymentQueueName, async (msg) => {
      const walletAddress = msg.content.toString();
      console.log(
        'Received payment request for wallet address:',
        walletAddress,
      );

      try {
        const paymentService = new PaymentService();
        const balance = await paymentService.processPayment(walletAddress);

        console.log('Payment processed successfully. Wallet balance:', balance);

        channel.assertQueue(paymentStatusQueueName, {
          durable: false,
        });
        channel.sendToQueue(
          paymentStatusQueueName,
          Buffer.from('Payment processed successfully'),
        );
      } catch (error) {
        console.error('Error processing payment:', error.message);
        channel.assertQueue(paymentStatusQueueName, {
          durable: false,
        });
        channel.sendToQueue(
          paymentStatusQueueName,
          Buffer.from(`Error processing payment: ${error.message}`),
        );
      }
    });
  });

  bootstrap();
});

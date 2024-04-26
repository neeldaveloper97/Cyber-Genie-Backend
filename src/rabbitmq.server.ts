import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { PaymentService } from './payment/payment.service';

@Injectable()
export class RabbitMQServer {
  constructor(private readonly paymentService: PaymentService) {}

  @RabbitSubscribe({
    exchange: 'payment',
    routingKey: 'process',
    queue: 'payment-queue',
  })
  async processPayment(data: any) {
    const walletAddress = data.walletAddress;
    console.log('walletAddress: ', walletAddress);
    await this.paymentService.processPayment(walletAddress);
  }
}

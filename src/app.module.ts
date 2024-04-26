import { Module } from '@nestjs/common';
import { PaymentModule } from './payment/payment.module';
import { RabbitMQServer } from './rabbitmq.server';
import { PaymentService } from './payment/payment.service';

@Module({
  imports: [PaymentModule],
  controllers: [],
  providers: [RabbitMQServer, PaymentService],
  exports: [PaymentService],
})
export class AppModule {}

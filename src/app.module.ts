import { Module } from '@nestjs/common';
import { PaymentModule } from './payment/payment.module';
import { RabbitMQServer } from './rabbitmq.server';
import { PaymentService } from './payment/payment.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [PaymentModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [RabbitMQServer, PaymentService],
  exports: [PaymentService],
})
export class AppModule {}

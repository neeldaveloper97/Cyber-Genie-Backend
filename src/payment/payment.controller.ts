import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('process')
  async processPayment(@Body('walletAddress') walletAddress: string) {
    try {
      const result = await this.paymentService.processPayment(walletAddress);
      return { balance: result };
    } catch (error) {
      return { error: error.message };
    }
  }
}
  
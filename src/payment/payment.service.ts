import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class PaymentService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
    const infuraUrl = process.env.infuraUrl;
    const walletPrivateKey = process.env.walletPrivateKey;
    this.provider = new ethers.JsonRpcProvider(infuraUrl);
    this.wallet = new ethers.Wallet(walletPrivateKey, this.provider);
  }

  async processPayment(walletAddress: string) {
    try {
      const correctedAddress = ethers.getAddress(walletAddress);

      const tx = await this.wallet.sendTransaction({
        to: correctedAddress,
        value: ethers.parseEther('0.1'),
      });

      await tx.wait();

      const balance = await this.provider.getBalance(this.wallet.address);
      const balanceEth = ethers.formatEther(balance);

      return balanceEth;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class PaymentService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
    const infuraUrl = 'https://sepolia.infura.io/v3/2308d6ed8a144a628b803fc13913ecc7'; 
    const walletPrivateKey = '4077b3f3d21b8303342c6528dc7f48b1ce8219044603b9f6cde13ed6d43177b0';
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





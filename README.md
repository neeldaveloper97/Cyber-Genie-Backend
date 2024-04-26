# Cyber Genie React Native Interview

## Submitting your completed code

- As you start saving the changes to your assignment within Stackblitz, it will automatically fork the repository.

- We strongly recommend creating an account with Stackblitz via a Github Account, to help you store the solutions and get back to it
  anytime you would like, otherwise, if you lose the tab, your changes may not be stored, be sure to keep the link!

- How to fork this repository after creating your account?

  - Click the "Fork" Icon at the top left corner of the link provided to you. (You are here!)

- Once you complete your assignment, you need to share with us your completed code, to do this, either:

  - Share Via Stackblitz: Click on "Share" button at the top left, and email us the Editor URL OR:

  - Share Via File Transfer: Download the project using the download icon on the left sidenav, and email us the .zip or a link to an accessible location of it!

## Ready to start? Let's get to it!

Develop a simple api endpoint that allows processing a payment using web3 ethereum wallet

- When I call the api with a valid etherum wallet address, I should immediatly get a reply that my request is being processed
- Make use of the [amqplib npm library](https://github.com/amqp-node/amqplib) to connect to the RabitMQ server and create a queue to queue your request
- Create a consumer to consume the queues, the consumer should process the payment (make use of infura creds and wallet key, and [ehters library](https://github.com/ethers-io/ethers.js?tab=readme-ov-file))
  - Connect to the provider
  - Connect you signer
  - Send your transaction
- Make use of the [amqplib npm library](https://github.com/amqp-node/amqplib) and publish your message once the transaction is complete.
- Return the wallet remaining ballance (bonus)

Tips: [Use RabitMQ for queue](https://www.rabbitmq.com)

**Note: This is not meant to be a full fledged application but rather to check your coding skills and how you approach problem solving.**

## Credentials

- Infura API Key: 2308d6ed8a144a628b803fc13913ecc7
- Infura API endpoint: https://sepolia.infura.io/v3/2308d6ed8a144a628b803fc13913ecc7
- Wallet Private Key: 4077b3f3d21b8303342c6528dc7f48b1ce8219044603b9f6cde13ed6d43177b0
- openzeppelin ERC20 Contract Address: https://sepolia.etherscan.io/address/0x908c2145717f682306dd3b97cd7826599bb2f879
- Network Name - Sepolia Testnet
- Block explorer URL - https://sepolia.etherscan.io/

## RabitMQ server credentials

- Address: amqp://cguser:YiZpmHXKQ8z3Rn93vFhx@165.22.92.187

**Note: If you need any configuration for the RabitMQ server let us know by messaging on our whatsapp group.**

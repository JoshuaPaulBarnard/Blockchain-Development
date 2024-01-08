console.log('Begin - Path Payments');

const {
  Keypair,
  Server,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  BASE_FEE
} = require('stellar-sdk');

async function main() {
  const questKeypair = Keypair.fromSecret('SCA2CE7TH6PXJ4POY7WP24S7HRGJP2BVCR4LCWVPX2MVDZRPX4QWNUIX');
  const issuerKeypair = Keypair.fromSecret('SAF3FQZ2O5KUC3YHM2SVWQXSEKZXUNA56UUUYDLNLXILT2OPINQG7C2L');
  const distributorKeypair = Keypair.fromSecret('SAYI47DU2IMBTHS6XWN547MOBDB5OW7RSNQRQTZXR26VWN5NN3DYY4D6');
  const destinationKeypair = Keypair.fromSecret('SDHKXQ64PWXX5RRTV4VNBZQKOMPYACNLLKTPVGGQTIIDX66SMJFFFH6F');

  const server = new Server('https://horizon-testnet.stellar.org');
  const questAccount = await server.loadAccount(questKeypair.publicKey());

  const pathAsset = new Asset('PATH', issuerKeypair.publicKey());

  const transaction = new TransactionBuilder(
    questAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET
    }
  )
    .addOperation(Operation.changeTrust({
      asset: pathAsset,
      source: destinationKeypair.publicKey()
    }))
    .addOperation(Operation.changeTrust({
      asset: pathAsset,
      source: distributorKeypair.publicKey()
    }))
    .addOperation(Operation.payment({
      destination: distributorKeypair.publicKey(),
      asset: pathAsset,
      amount: '1000000',
      source: issuerKeypair.publicKey()
    }))
    .addOperation(Operation.createPassiveSellOffer({
      selling: pathAsset,
      buying: Asset.native(),
      amount: '2000',
      price: '1',
      source: distributorKeypair.publicKey()
    }))
    .addOperation(Operation.createPassiveSellOffer({
      selling: Asset.native(),
      buying: pathAsset,
      amount: '2000',
      price: '1',
      source: distributorKeypair.publicKey()
    }))
    .addOperation(Operation.pathPaymentStrictSend({
      sendAsset: Asset.native(),
      sendAmount: '1000',
      destination: destinationKeypair.publicKey(),
      destAsset: pathAsset,
      destMin: '1000'
    }))
    .addOperation(Operation.pathPaymentStrictReceive({
      sendAsset: pathAsset,
      sendMax: '450',
      destination: questKeypair.publicKey(),
      destAsset: Asset.native(),
      destAmount: '450',
      source: destinationKeypair.publicKey()
    }))
    .setTimeout(30)
    .build();

  transaction.sign(
    questKeypair,
    issuerKeypair,
    destinationKeypair,
    distributorKeypair
  );

  try {
    let res = await server.submitTransaction(transaction);
    console.log(`Transaction Successful! Hash: ${res.hash}`);
  } catch (error) {
    console.log(`${error}. More details:\n${JSON.stringify(error.response.data.extras, null, 2)}`);
  }
}

// Call the async function to start the execution
main();

console.log('Concluded - Path Payments');

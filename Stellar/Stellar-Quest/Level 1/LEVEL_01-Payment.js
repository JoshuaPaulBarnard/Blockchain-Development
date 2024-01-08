console.log('Begin - Payment');

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
  const questKeypair = Keypair.fromSecret('SBX2XICF2WX2746HDNYWD4BKS547PCGTYD4I7HCT4PN4TTL66FTCVCGG');
  const destinationKeypair = Keypair.fromSecret('SAF3FQZ2O5KUC3YHM2SVWQXSEKZXUNA56UUUYDLNLXILT2OPINQG7C2L');

  //  Fund the destination address
  //  Install friendbot helper function with:  npm install @runkit/elliotfriend/sq-learn-utils@1.0.6
  //  const { friendbot } = require('@runkit/elliotfriend/sq-learn-utils/1.0.6');
  //  await friendbot([questKeypair.publicKey(), destinationKeypair.publicKey()]);

  const server = new Server('https://horizon-testnet.stellar.org');
  const questAccount = await server.loadAccount(questKeypair.publicKey());

  const transaction = new TransactionBuilder(
    questAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET
    })
    .addOperation(Operation.payment({
      destination: destinationKeypair.publicKey(),
      asset: Asset.native(),
      amount: '100'
    }))
    .setTimeout(30)
    .build();

  transaction.sign(questKeypair);

  try {
    let res = await server.submitTransaction(transaction);
    console.log(`Transaction Successful! Hash: ${res.hash}`);
  } catch (error) {
    console.log(`${error}. More details:\n${JSON.stringify(error.response.data.extras, null, 2)}`);
  }
}

// Call the async function to start the execution
main();


console.log('Concluded - Payment');

console.log('Begin - Change Trust');
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

  const questKeypair = Keypair.fromSecret('SAYI47DU2IMBTHS6XWN547MOBDB5OW7RSNQRQTZXR26VWN5NN3DYY4D6');
  const issuerKeypair = Keypair.fromSecret('SAF3FQZ2O5KUC3YHM2SVWQXSEKZXUNA56UUUYDLNLXILT2OPINQG7C2L');

  const server = new Server('https://horizon-testnet.stellar.org');
  const questAccount = await server.loadAccount(questKeypair.publicKey());

  const santaAsset = new Asset(
    'SANTA',  // Use regular single or double quotes here
    issuerKeypair.publicKey()
  );

  const transaction = new TransactionBuilder(
    questAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET
    })
    .addOperation(Operation.changeTrust({
      asset: santaAsset,
      limit: '100',  // Use regular single or double quotes here
      source: questKeypair.publicKey()
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


console.log('Concluded - Change Trust');

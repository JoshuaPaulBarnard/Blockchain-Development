console.log('Begin - Set Options - Weights, Thresholds, and Signers');

const {
  Keypair,
  Server,
  TransactionBuilder,
  Networks,
  Operation,
  BASE_FEE
} = require('stellar-sdk');

async function main() {
  const questKeypair = Keypair.fromSecret('SBTI64CEGKBOWKHKU6EO6KIJHXHDOXYHNJQT4TOSEKZ54YUS7PVBHZFT');
  const secondSigner = Keypair.fromSecret('SAF3FQZ2O5KUC3YHM2SVWQXSEKZXUNA56UUUYDLNLXILT2OPINQG7C2L');
  const thirdSigner  = Keypair.fromSecret('SAYI47DU2IMBTHS6XWN547MOBDB5OW7RSNQRQTZXR26VWN5NN3DYY4D6');

  const server = new Server('https://horizon-testnet.stellar.org');
  const questAccount = await server.loadAccount(questKeypair.publicKey());

  const transaction = new TransactionBuilder(questAccount, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
  })
    .addOperation(Operation.setOptions({
      masterWeight: 1,
      lowThreshold: 5,
      medThreshold: 5,
      highThreshold: 5,
      signer: {
        ed25519PublicKey: secondSigner.publicKey(),
        weight: 2
      }
    }))
    .addOperation(Operation.setOptions({
      signer: {
        ed25519PublicKey: thirdSigner.publicKey(),
        weight: 2
      }
    }))
    .setTimeout(30)
    .build();  // Build the transaction object

  transaction.sign(questKeypair);  // Sign the transaction with the questKeypair

  try {
    const res = await server.submitTransaction(transaction);
    console.log(`Transaction Successful! Hash: ${res.hash}`);
  } catch (error) {
    console.log(`${error}. More details:\n${JSON.stringify(error.response.data.extras, null, 2)}`);
  }
}

// Call the async function to start the execution
main();

console.log('Concluded - Set Options - Weights, Thresholds, and Signers');

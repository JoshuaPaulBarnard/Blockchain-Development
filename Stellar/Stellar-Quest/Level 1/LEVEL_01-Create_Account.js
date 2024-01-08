console.log('Begin - LEVEL 01  Create Account');


const { Keypair, Server, TransactionBuilder, Networks, Operation, BASE_FEE } = require('stellar-sdk');

async function main() {
  // Step 1:

  const questKeypair = Keypair.fromSecret('SAF3FQZ2O5KUC3YHM2SVWQXSEKZXUNA56UUUYDLNLXILT2OPINQG7C2L');
  const newKeypair = Keypair.random();

  const server = new Server('https://horizon-testnet.stellar.org');
  const questAccount = await server.loadAccount(questKeypair.publicKey());

  // Step 2:

  const transaction = new TransactionBuilder(
    questAccount, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
  });

  transaction.addOperation(Operation.createAccount({
    destination: newKeypair.publicKey(),
    startingBalance: "4200"
  }));

  transaction.setTimeout(30);
  const builtTransaction = transaction.build();
  builtTransaction.sign(questKeypair);

  const xdr = builtTransaction.toXDR(); // Get the XDR representation

  console.log(xdr); // Print the XDR representation

  try {
    const res = await server.submitTransaction(builtTransaction);
    console.log(`Transaction Successful! Hash: ${res.hash}`);
  } catch (error) {
    console.log(`${error}. More details:\n${JSON.stringify(error.response.data.extras, null, 2)}`);
  }
}

// Call the async function to start the execution
main();




console.log('Concluded - LEVEL 01  Create Account');

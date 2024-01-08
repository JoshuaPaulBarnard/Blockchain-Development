console.log('Begin - Manage Offers - Passive Sell');

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
  const questKeypair = Keypair.fromSecret('SDHKXQ64PWXX5RRTV4VNBZQKOMPYACNLLKTPVGGQTIIDX66SMJFFFH6F');

  const server = new Server('https://horizon-testnet.stellar.org');
  const questAccount = await server.loadAccount(questKeypair.publicKey());

  const usdcAsset = new Asset(
    'USDC',
    'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5'
  );

  const transaction = new TransactionBuilder(
    questAccount,
    {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET
    }
  )
    .addOperation(Operation.changeTrust({
      asset: usdcAsset
    }))
    .addOperation(Operation.createPassiveSellOffer({
      selling: Asset.native(),
      buying: usdcAsset,
      amount: '1000',
      price: '0.1',
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

console.log('Executed - Manage Offers - Passive Sell');

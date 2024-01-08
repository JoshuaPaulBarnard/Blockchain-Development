console.log('Begin - Set Options - Home Domain');

const {
  Keypair,
  Server,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  BASE_FEE
} = require('stellar-sdk')

async function main() {

  const questKeypair = Keypair.fromSecret('SC7DUQRDGJLFOJMVXWF2ZGRJHLH7BVA2RZWIDEJM3ROY55ORJF3BQ3ZN')

  const server = new Server('https://horizon-testnet.stellar.org')
  const questAccount = await server.loadAccount(questKeypair.publicKey())


  const transaction = new TransactionBuilder(
    questAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET
    })
    .addOperation(Operation.setOptions({
      homeDomain: 'hh64soy4zzw6.runkit.sh'
    }))
    .setTimeout(30)
    .build()



  transaction.sign(questKeypair)

  try {
    const res = await server.submitTransaction(transaction)
    console.log(`Transaction Successful! Hash: ${res.hash}`)
  } catch (error) {
    console.log(`${error}. More details:\n${JSON.stringify(error.response.data.extras, null, 2)}`)
  }

}

// Call the async function to start the execution
main();

console.log('Concluded - Set Options - Home Domain');

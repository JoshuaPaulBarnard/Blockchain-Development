console.log('Begin Reading - {script name}');

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

  //  Remove '-testnet' to run real commands on the Stellar Network.
  const server = new Server('https://horizon-testnet.stellar.org')

  //  Replace SECRET_KEY_HERE with the Secret Key of the account you are using.
  const questKeypair = Keypair.fromSecret('SECRET_KEY_HERE')
  const questAccount = await server.loadAccount(questKeypair.publicKey())















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


console.log('Finished Reading - {script name}');

console.log('Begin - Account Merge');

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

  const questKeypair = Keypair.fromSecret('SDB7EPBEWH6JBJIWGNKGC2JFTETLVGMBZBXEWJBQSMQ3D6LMQHOUXVWA')
  const destinationKeypair = Keypair.fromSecret('SCA2CE7TH6PXJ4POY7WP24S7HRGJP2BVCR4LCWVPX2MVDZRPX4QWNUIX');

  const server = new Server('https://horizon-testnet.stellar.org')
  const questAccount = await server.loadAccount(questKeypair.publicKey())

  const transaction = new TransactionBuilder(
  questAccount, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
  })
  .addOperation(Operation.accountMerge({
    destination: destinationKeypair.publicKey()
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

console.log('Concluded - Account Merge');

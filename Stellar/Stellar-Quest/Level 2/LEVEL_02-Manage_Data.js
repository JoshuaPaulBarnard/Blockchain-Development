console.log('Begin - Manage Data');

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

  const questKeypair = Keypair.fromSecret('SC3PW2UQ2LNFSTBBTC37ZGB5Y3UHIHZ3J6DY53CSPHVTCBFQ2WBKYVQH')

  const server = new Server('https://horizon-testnet.stellar.org')
  const questAccount = await server.loadAccount(questKeypair.publicKey())

  const transaction = new TransactionBuilder(
    questAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET
    })
    .addOperation(Operation.manageData({
      name: 'Stellar',
      //  Base64-Encoded String with a Maximum length of 64 bytes
      value: Buffer.from('Quest!')
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


console.log('Concluded - Manage Data');

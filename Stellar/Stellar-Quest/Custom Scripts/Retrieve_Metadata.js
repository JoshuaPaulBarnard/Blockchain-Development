//    Title:        Retrieve Metadata
//    Description:  A script to retrieve the metadata from a stellar account
//                  (public key) and then display the Base64-Encoded String, and
//                  the decoded string.
//    Author:       Psylocybin42


console.log('Begin Reading Script - Retrieve Metadata');

const {
  Keypair,
  Server,
  Networks
} = require('stellar-sdk');

// Function to decode base64-encoded string
const base64ToString = (base64) => {
  const buffer = Buffer.from(base64, 'base64');
  return buffer.toString('utf-8');
};

async function main() {
  try {
    //  Remove '-testnet' to run on the real Stellar Network.
    const server = new Server('https://horizon-testnet.stellar.org');

    // Replace with the public address you want to retrieve metadata from
    const publicKey = 'GAI72F4S7Q7CA4UJCK6J6KFYQBIMFT3O4DDQZ7ZO5TGKS3Y762VARXQA';
    const account = await server.loadAccount(publicKey);

    //  Replace SECRET_KEY_HERE with the Secret Key of the account you are using.
    //const keypair = Keypair.fromSecret('SECRET_KEY_HERE')
    //const account = await server.loadAccount(questKeypair.publicKey())

    //  Retrieve metadata information
    const metadata = account.data_attr;

    //  Display the raw metadata
    console.log('\nBase64-Encoded Values:');
    for (const key in metadata) {
      console.log(`${key}: ${metadata[key]}`);
    }

    //  Displays the decoded metadata
    console.log('\nDecoded Original Forms:');
    for (const key in metadata) {
      const decodedValue = base64ToString(metadata[key]);
      console.log(`${key}: ${decodedValue}`);
    }

    //  catch for errors
  } catch (error) {
    console.error(`Error: ${error}`);
    if (error.response && error.response.data && error.response.data.extras) {
      console.log('More details:');
      console.log(JSON.stringify(error.response.data.extras, null, 2));
    }
  }

}

// Call the async function to start the execution
main();

console.log('Finished Reading Script - Retrieve Metadata');

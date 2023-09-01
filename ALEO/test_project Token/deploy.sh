

WALLETADDRESS="aleo1mxc43d5dw2xm4luek3d9nhfjrc39lsunmuj4xkkyp79a2ngvtsys8n68vr"
PRIVATEKEY="APrivateKey1zkp7BkuPTPWYT7mv9mbQLqfAhe2woGkL8zqkzCjv1wzYrVY"

APPNAME="test_project"
PATHTOAPP=$(realpath -q $APPNAME)

RECORD="{
  owner: aleo1mxc43d5dw2xm4luek3d9nhfjrc39lsunmuj4xkkyp79a2ngvtsys8n68vr.private,
  microcredits: 50000000u64.private,
  _nonce: 7020810876280275062360229093034949966236049271765324650160785557041297542456group.public
}"

cd .. && snarkos developer deploy "${APPNAME}.aleo" --private-key "${PRIVATEKEY}" --query "https://vm.aleo.org/api" --path "./${APPNAME}/build/" --broadcast "https://vm.aleo.org/api/testnet3/transaction/broadcast" --fee 1000000 --record "${RECORD}"``
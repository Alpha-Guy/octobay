require('dotenv').config({ path: './.evm/.env' })
const readline = require('readline')
const sh = require('shelljs')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const relayHubAddress = require('./.evm/build/gsn/RelayHub.json').address
const forwarderAddress = require('./.evm/build/gsn/Forwarder.json').address
const paymasterAddress = require('./.evm/build/gsn/Paymaster.json').address

sh.sed('-i', /^GSN_RELAYHUB_ADDRESS=.*$/, 'GSN_RELAYHUB_ADDRESS=' + relayHubAddress, '.evm/.env')
sh.sed('-i', /^GSN_FORWARDER_ADDRESS=.*$/, 'GSN_FORWARDER_ADDRESS=' + forwarderAddress, '.evm/.env')
sh.sed('-i', /^GSN_PAYMASTER_ADDRESS=.*$/, 'GSN_PAYMASTER_ADDRESS=' + paymasterAddress, '.evm/.env')

if (!process.env.CHAINLINK_NODE_ADDRESS) {
  rl.question('Chainlink Node Address? ', chainlinkNodeAddress => {
    sh.sed('-i', /^CHAINLINK_NODE_ADDRESS=.*$/, 'CHAINLINK_NODE_ADDRESS=' + chainlinkNodeAddress, '.evm/.env')
    sh.sed('-i', /^CHAINLINK_NODE_ADDRESS=.*$/, 'CHAINLINK_NODE_ADDRESS=' + chainlinkNodeAddress, '.env')
    rl.close()
  })
} else {
  rl.close()
}

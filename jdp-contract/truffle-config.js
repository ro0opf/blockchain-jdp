const PrivateKeyProvider = require("@truffle/hdwallet-provider");

const privateKey = "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";
const privateKeyProviderMainnet = new PrivateKeyProvider(privateKey, "https://besu.chainz.network");
const privateKeyProviderTestnet = new PrivateKeyProvider(privateKey, "https://besutest.chainz.network");

module.exports = {

    // Uncommenting the defaults below
    // provides for an easier quick-start with Ganache.
    // You can also follow this format for other networks;
    // see <http://truffleframework.com/docs/advanced/configuration>
    // for more details on how to specify configuration options!
    //
    networks: {
        besu: {
            provider: privateKeyProviderMainnet,
            gasPrice: 0,
            network_id: "2020"
        },

        // testnet
        besuTest: {
            provider: privateKeyProviderTestnet,
            network_id: "2020"
        },
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*"
        },
        test: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*"
        }
    },
    compilers: {
        solc: {
            version: "^0.6.0",    // Fetch exact version from solc-bin (default: truffle's version)
            docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
            settings: {           // See the solidity docs for advice about optimization and evmVersion
                optimizer: {
                    enabled: false,
                    runs: 200
                },
                evmVersion: "constantinople"
            }
        }
    }
};

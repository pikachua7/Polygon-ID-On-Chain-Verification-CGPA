require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/477a4r1CxgMaMcbhdfTIYvRiqyfxeT9H`,
      accounts: [`0x6b204426c792645cde36b9cb39dae4dfd890da97b115aba14aab3c6bba675d70`],
    }
  }
};
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path: ".env"});
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    alfajores:{
      url:"https://alfajores-forno.celo-testnet.org" ,
    accounts: [PRIVATE_KEY],
    chainId: 44787,

    }
    
  }
};

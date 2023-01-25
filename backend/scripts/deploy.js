const {ethers} = require("hardhat");
//InuaSautiContract 0xF17153bedBe9D979485c16BaC1adDc5d60b84622
//2. InuaSautiContract 0x93fe8f7A78A5D00296445d273d211583f8320523
//3  InuaSautiContract 0x907B764d5a46e9135099346382d609af0DF2dE1b
//4. InuaSautiContract 0xa0a020EA660E67DeEc5614ebB3fBCdF8De4330dB
//5. InuaSautiContract 0x8FfA367805c46989c0f209E433c23A12ed21aE95
//6. InuaSautiContract 0xff1686BdbB8c0924ac4E058039B982d3057e3a57
//7. InuaSautiContract 0x90A27C6E24e694f4D012A91C82E64b6B8371D4Cf
//8. InuaSautiContract 0xbb6a0263bf26D3629F0ad3Fc27657fC9ee072386
//9. InuaSautiContract 0x605E297c3319839e5340AC6192708D8a6a196c76
//10. InuaSautiContract 0xaFD2B038F64a895C392f22FC370aa850C42e46bC 
//11. InuaSautiContract 0x7fca5797f7fe0B9258fDCF498C4486Ad07FDb271
async function main(){
  //get the contract
  const inuasautiContract =  await ethers.getContractFactory("InuaSauti");

  //deploy the contract
  const inuasautiContractDeploy = await inuasautiContract.deploy();


  //await deployment
  await inuasautiContractDeploy.deployed();

  //console.log the address
  console.log("InuaSautiContract", inuasautiContractDeploy.address);
}
main().then(()=>
process.exit(0))
.catch((error)=>{
  console.log(error);
  process.exit(1);
})
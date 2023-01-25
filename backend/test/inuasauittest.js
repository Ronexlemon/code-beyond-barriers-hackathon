const {ethers} = require("hardhat");
const {expect} = require("chai");
describe("InuaSauti Contract",function(){
    let inuasautiContract;

    beforeEach(async function(){
        //get the contract
        const inuasautiFactory = await ethers.getContractFactory("InuaSauti");
        inuasautiContract = await inuasautiFactory.deploy();
        await inuasautiContract.deployed();
        
    });

    it("it should be able post data successful" ,async function(){
        const message = "inuasautiMessage";
        const id = 0;
        const category = "Technology";
        await inuasautiContract.getMessagefromUshahidiApi(message,id,category);
        
     
        const storedMessage = await inuasautiContract.storeMessages(0);
        expect(storedMessage._message).to.equal(message);
        expect(storedMessage._messageId).to.equal(id);
        expect(storedMessage._category).to.equal(category);
        expect(storedMessage._status).to.equal(1);
    }); 

    it("Should set value of membership of address to true", async function(){
        const signers = await ethers.getSigners(); 
        const owner = await signers[0]; 
        const address = await owner.getAddress(); 
        await inuasautiContract.joinInuaSautiCommunity({ from: address });
        
        const response = await inuasautiContract.inuaSautiMembers(address); 

        expect(response).to.be.true; 
    }); 
    
    it("Should revert the transaction with the reason not a member", async function() {
        const signers = await ethers.getSigners(); 
        const owner = await signers[0]; 
        const addressOne = await owner.getAddress(); 

        const message = "inuasautiMessage";
        const id = 0;
        const category = "Technology";
        await inuasautiContract.getMessagefromUshahidiApi(message,id,category);

        const response = await inuasautiContract.voteForInformationShared("true", 0, { from: addressOne }); 

        expect(response).to.be.revertedWith("Not a member of InuaSauti organisation!"); 
    }); 

    //  "fixed" now passing
    it("Should revert with the reason deadline passed", async function() {
        const signers = await ethers.getSigners(); 
        const owner = await signers[0]; 
        const addressOne = await owner.getAddress(); 
        
        const response = await inuasautiContract.voteForInformationShared("true", 0, { from: addressOne }); 

        expect(response).to.be.revertedWith('Deadline for voting on this proposal has already passed!'); 
    });

    it("Should emmit message true transfer event", async function() {
        const signers = await ethers.getSigners(); 
        const owner = await signers[0]; 
        const addressOne = await owner.getAddress(); 

        const message = "inuasautiMessage";
        const id = 0;
        const category = "Technology";
        await inuasautiContract.getMessagefromUshahidiApi(message,id,category);

        await inuasautiContract.voteForInformationShared("true", 0, { from: addressOne }); 
        await inuasautiContract.voteForInformationShared("true", 0, { from: addressOne }); 
        await inuasautiContract.voteForInformationShared("false", 0, { from: addressOne }); 

        const response = await inuasautiContract.determineTheSupportOfInformation(1); 

        expect(response).to.emit(inuasautiContract, "messageTrue")
        .withArgs(message, category); 
    })  




    


    });
    
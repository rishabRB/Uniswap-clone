const main = async () =>{
	const transactionFactory = await hre.ethers.getContractFactory("Transaction");
	const transactionContract = await transactionFactory.deploy();

	await transactionContract.deployed();

	console.log('Transaction.sol contract deployed to : ', transactionContract.address )

}


main()
	.then(()=> process.exit(0))
    .catch((error)=>{
	 console.log(error);
		process.exit(1);
	})

import React,{useState,useEffect} from 'react' 
import {ethers} from 'ethers'
import {client} from '../lib/sanityClient'
import {contractABI,contractAddress } from '../lib/constants'
import { useRouter } from 'next/router'
export const TransactionContext = React.createContext()


let eth
if(typeof window !== 'undefined'){
	eth=window.ethereum
}


const getEthereumContract=()=>{

	//A Provider is a class whicj provide an abstraction for a connetion ti the Ethereum Network .It provide read only access to thr blockchain	   //and its status
	const provider = new ethers.providers.Web3Provider(ethereum)
	// A signer is a class which in some way directly or indirectly has accesss to a private key which can sign message and transaction to authorize the network to charge your account ehter to perform operation 
	const signer=provider.getSigner()
	// A contract is abstraction which represent a comnmection to a specific contract on the Ethereum  network so that application can use it like a normal javascript	
	const transactionContract=new ethers.Contract(
	  contractAddress,
	  contractABI,
	  signer,
	)

	return transactionContract

}


export const TransactionProvider =({children})=>{
	const [currentAccount,setCurrentAccount]=useState(null)
	const [isLoading,setIsLoading] = useState(false)
	const[formData,setformData]=useState({
	   addressTO:'',
	   amount:''
	})

    const router=useRouter()

	useEffect(()=>{
	  checkIfWalletisConnect()
	},[])

	useEffect(()=>{
		if(!currentAccount) return 
		// JavaScript Immediately-invoked Function Expressions (IIFE)
		(async ()=>{
		 const userDoc = {
			 _type:'users',
			 _id:currentAccount,
			 UserName:'Unnamed',
			 address:currentAccount,
		 }
			await client.createIfNotExists(userDoc)
		})()
	},[currentAccount])


const connectWallet= async (metamask = eth)=>{
	try{
		if(!metamask) return alert("please install metamask")
		const account= await metamask.request({method:'eth_requestAccounts'}) 
		setCurrentAccount(account[0])
	}
	catch(error){
		console.log(error)
		throw new Error("No ethereum object")
	}
 
}

const checkIfWalletisConnect=async (metamask =eth) =>{
 try{
	 if(!metamask) return alert("Please Install metamask")
	 const accounts=await metamask.request({method:'eth_accounts'})

	 if(accounts.length){
		 setCurrentAccount(accounts[0])
	 }
 }
	catch(error){
	console.log(error)
	}

}

const saveTransaction =  async (
    txHash,
	amount,
	fromAddress=currentAccount,
	toAddress


)=>{
    
	const txDoc={

		_type:'transaction',
		_id:txHash,
		fromAddress:fromAddress,
		toAddress:toAddress,
		timestamp:new Date(Date.now()).toISOString(),
		txHash:txHash,
		amount:parseFloat(amount),	
	}

	await client.createIfNotExists(txDoc)

	await client.patch(currentAccount)
		.setIfMissing({transactions:[]})	
		.insert('after','transactions[-1]',[
			{
				_key:txHash,
				_ref:txHash,
				_type:'reference',
			},	
		])
		.commit()
	return 
}

useEffect(()=>{
    if(isLoading) {
	 router.push(`/?loading=${currentAccount}`)
	}
	else{
		router.push(`/`)
	}

},[isLoading])


const sendTransaction= async (
	metamask = eth,
	connectedAccount=currentAccount
	
)=>{

	try{
		if(!metamask) return  alert("Please install metamask")
		const {addressTo,amount}=formData
		const transactionContract=getEthereumContract()

		const parsedAmount=ethers.utils.parseEther(amount)

		await metamask.request({
		 method:'eth_sendTransaction',
			params:[
			 {
			   from:connectedAccount,
				 to:addressTo,
				 gas:'0x7EF40',
				 value:parsedAmount._hex,
			 }
		 ]
		})


		const transactionHash = await transactionContract.publishTransaction(
			addressTo,
			parsedAmount,
			`Transferring ETH ${parsedAmount} to ${addressTo}`,
            'TRANSFER',
		)

		setIsLoading(true)

		await transactionHash.wait()

		await saveTransaction(
			transactionHash.hash,
			amount,
			connectedAccount,
			addressTo,
		)
		setIsLoading(false)
	}
	catch(error){
	console.log(error)
	}

}

const handleChange=(e,name)=>{
	setformData(prevState => ({...prevState , [name]:e.target.value}))
	}

return(
	<TransactionContext.Provider
	  value={{
		      currentAccount,
			  connectWallet,
			  sendTransaction,
			  handleChange,
			  formData,

	  }}
	>
	{children}
	</TransactionContext.Provider>

) 

}



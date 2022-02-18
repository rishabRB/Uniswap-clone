import React,{useState,useEffect} from 'react'

export const TransactionContext = React.createContext()

let eth
if(typeof window !== 'undefined'){
	eth=window.ethereum
}


export const TransactionProvider =({children})=>{
	const [currentAccount,setCurrentAccount]=useState(null)

	useEffect(()=>{
	  checkIfWalletisConnect()
	},[])


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

return(
	<TransactionContext.Provider
	  value={{
		   currentAccount,
		  connectWallet,
	  }}
	>
	{children}
	</TransactionContext.Provider>

) 

}



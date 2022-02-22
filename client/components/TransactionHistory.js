import Image from 'next/image'
import {useState,useEffect,useContext} from "react"
import ethLogo from '../assets/eth.png'
import {TransactionContext} from '../context/transactionContext.js'
import {FiArrowUpRight} from 'react-icons/fi'
import {client} from '../lib/sanityClient'

const style = {
  wrapper: `h-full text-white select-none h-full w-screen flex-1 pt-14 flex items-end justify-end pb-12 overflow-hidden px-8`,
  txHistoryItem: `bg-[#191a1e] rounded-lg px-4 py-2 my-2 flex items-center justify-end`,
  txDetails: `flex items-center`,
  toAddress: `text-[#f48706] mx-2`,
  txTimestamp: `mx-2`,
etherscanLink: `flex items-center text-[#2172e5]`,
}

const TransactionHistory=()=>{
	const {isLoading,currentAccount} = useContext(TransactionContext)
	const [transactionHistory,setTransactionHistory]=useState([])
	
	useEffect(()=>{
		;(async ()=>{
			if(!isLoading && currentAccount){

				const query =`*[_type == "users" && _id == "${currentAccount}"]{
				"transactionList":transactions[] -> {amount,toAddress,timestamp,txHash}|order(timestamp,desc)[0..2]
				}
				`

				const clientRes=await client.fetch(query)
				setTransactionHistory(clientRes[0].transactionList)
			
			}
		})()
	
	},[currentAccount,isLoading])


	return(
		<div className={style.wrapper}>
		<div>
		{ transactionHistory && 
			transactionHistory?.map((transaction,index) => (
			<div className={style.txHistoryItem} key={index}>
				<div className={style.txDetails}>
				{transaction.amount}
				<Image src={ethLogo} height={16} width={15} alt='eth' />
				  sent to {''}
				<span className = {style.toAddress}>
				{transaction.toAddress.substring(0,6)}...
				</span>
				</div>{' '}
				on{' '}
                <div className={style.txTimestamp}>
                {new Date(transaction.timestamp).toLocaleString('en-US', {
                  timeZone: 'IST',
                  hour12: true,
                  timeStyle: 'short',
                  dateStyle: 'long',
                })}
				</div> 
				<div className={style.etherscanLink}>
                <a
                  href={`https://rinkeby.etherscan.io/tx/${transaction.txHash}`}
                  target='_blank'
                  rel='noreferrer'
                  className={style.etherscanLink}
                >
                  View on Etherscan
                  <FiArrowUpRight />
                </a>
              </div>
			  </div>
			))
		
		}
		</div>
		</div>
	)

}


export default TransactionHistory

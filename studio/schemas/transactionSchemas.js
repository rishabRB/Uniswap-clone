export const transactionSchema={

	name:'transaction',
	title:'Transactions',
	type:'document',
	fields:[
         {
		   name:'txHash',
           title:'Transaction Hash',
           type:'string'
	     },
		 {
			 name:'fromAddress',
			 title:'from (Wallet address)',
			 type:'string',
		 },
		 {
			 name:'toAddress',
			 title:'To (Wallet address)',
			 type:'string',
		 },
		{
			name:'amount',
			title:'Amount',
			type:'number',
		},
		{
			name:'timeStamp',
			title:'Timestamp',
			type:'datetime',
		}, 
	], 
}

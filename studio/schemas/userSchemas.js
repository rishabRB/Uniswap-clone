export const userSchema={

	name:'users',
	title:'Users',
	type:'document',
	fields:[
		{
			name:'address',
			title:'Wallet Addres',
			type:'string',
		},
		{
			name:'UserName',
			title:'User Name',
			type:'string',
		},
		{
		   name:'transactions',
		   title:'Transactions',
		   type:'array',
		   of:[
		     {
			   type:'reference',
			   to:[{type:'transaction'}]
			 },
		   ],
			   
		},
	],


}

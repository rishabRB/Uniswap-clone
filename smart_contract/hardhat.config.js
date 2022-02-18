require("@nomiclabs/hardhat-waffle");

module.exports = {
	solidity: "0.8.4",
	networks:{
	  rinkeby:{
		  url:'https://eth-rinkeby.alchemyapi.io/v2/okDpCABQRadSnUKApCVdAVoW513oofwD',
		  accounts:['22728f63048d951f292b086f4f3f726628bacfb140afeebbd139fa39bcaefbce']

	  }
	}

};

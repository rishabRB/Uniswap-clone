//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Transaction{
 event Transfer(address sender, address reciver, uint amount, string message , uint256 timestamp, string keyword);

 function publishTransaction(address payable reciver ,uint amount, string memory message, string memory keyword ) public {
 emit Transfer(msg.sender,reciver,amount,message,block.timestamp,keyword);
 }

}

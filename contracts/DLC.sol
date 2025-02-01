// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract DecentralizedLottery {
    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }

    function enterLottery() public payable {
        require(msg.value == 0.1 ether, "Entry fee is 0.1 ETH");
        players.push(msg.sender);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function pickWinner() public restricted {
        require(players.length > 0, "No players in the lottery");
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
        players = new address  }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, players.length, msg.sender)));
    }

    modifier restricted() {
        require(msg.sender == manager, "Only manager can pick a winner");
        _;
    }
}


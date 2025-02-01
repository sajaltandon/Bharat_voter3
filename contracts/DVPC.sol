// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ProposalVoting {
    struct Proposal {
        string title;
        string description;
        uint voteCount;
    }

    address public admin;
    Proposal[] public proposals;
    mapping(address => bool) public hasVoted;

    constructor() {
        admin = msg.sender;
    }

    function createProposal(string memory _title, string memory _description) public {
        proposals.push(Proposal(_title, _description, 0));
    }

    function vote(uint _proposalId) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(_proposalId < proposals.length, "Invalid proposal ID");

        proposals[_proposalId].voteCount++;
        hasVoted[msg.sender] = true;
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }
}


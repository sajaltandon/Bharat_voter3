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

    event ProposalCreated(uint proposalId, string title, string description);
    event Voted(uint proposalId, address voter);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier hasNotVoted() {
        require(!hasVoted[msg.sender], "Already voted");
        _;
    }

    modifier validProposalId(uint _proposalId) {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function createProposal(string memory _title, string memory _description) public onlyAdmin {
        proposals.push(Proposal(_title, _description, 0));
        emit ProposalCreated(proposals.length - 1, _title, _description);
    }

    function vote(uint _proposalId) public hasNotVoted validProposalId(_proposalId) {
        proposals[_proposalId].voteCount++;
        hasVoted[msg.sender] = true;
        emit Voted(_proposalId, msg.sender);
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }

    function resetVoting() public onlyAdmin {
        for (uint i = 0; i < proposals.length; i++) {
            proposals[i].voteCount = 0;
        }
        for (uint i = 0; i < proposals.length; i++) {
            hasVoted[msg.sender] = false;
        }
    }
}
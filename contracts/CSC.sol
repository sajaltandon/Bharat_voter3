// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Crowdfunding {
    struct Campaign {
        address creator;
        string title;
        string description;
        uint goal;
        uint fundsRaised;
    }

    Campaign[] public campaigns;
    mapping(uint => mapping(address => uint)) public contributions;

    function createCampaign(string memory _title, string memory _description, uint _goal) public {
        campaigns.push(Campaign(msg.sender, _title, _description, _goal, 0));
    }

    function contribute(uint _campaignId) public payable {
        require(_campaignId < campaigns.length, "Campaign does not exist");
        require(msg.value > 0, "Contribution must be greater than zero");

        campaigns[_campaignId].fundsRaised += msg.value;
        contributions[_campaignId][msg.sender] += msg.value;
    }

    function withdrawFunds(uint _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.creator, "Only campaign creator can withdraw");
        require(campaign.fundsRaised >= campaign.goal, "Funding goal not met");

        payable(campaign.creator).transfer(campaign.fundsRaised);
        campaign.fundsRaised = 0;
    }
}

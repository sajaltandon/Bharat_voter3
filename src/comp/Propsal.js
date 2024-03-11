import React from "react";
import * as ReactBootStrap from "react-bootstrap";
import { useState } from "react";

function Proposal({ contract, account, provider }) {
  const [showProposal, setShowProposal] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("proposal component");

  const toggleProposal = () => {
    setShowProposal(!showProposal);
  };

  const setProposal = async (e) => {
    e.preventDefault();
    const candidateAddress = document.getElementById("Account").value;
    const name = document.getElementById("Name").value;
    
    if (candidateAddress && name) {
      setLoading(true);
      const tx = await contract.RequestForNextVoting(candidateAddress, name);
      const receipt = await tx.wait();
      console.log("Submitted Successfully!");
      console.log(receipt);
      window.location.reload();
    } else {
      alert("Please fill input fields.");
    }
  };

  const fetchCandidates = async () => {
    const fetchedCandidates = await contract.getRequestProposal();
    console.log(fetchedCandidates);
    setCandidates(fetchedCandidates);
  };

  return (
    <div>
      <br />
      <button onClick={toggleProposal} className="btn btn-primary">
        Send Proposal For Next Election!
      </button>
      
      {showProposal && (
        <form onSubmit={setProposal} className="form-group">
          <div className="m-3">
            <p className="h5">Connected Address: {account}</p>
          </div>
          <div className="p-2">
            Address Of Candidate: 
            <input type="text" id="Account" className="form-control" />
          </div>
          <div className="p-2">
            Name: 
            <input type="text" id="Name" className="form-control" />
          </div>
          <button type="submit" className="btn btn-dark mt-2">
            {!loading ? (
              "Submit Now!"
            ) : (
              <ReactBootStrap.Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </button>
        </form>
      )}

      <br />

      <div className="mt-3">
        <button onClick={fetchCandidates} className="btn btn-success">
          Fetch Next Candidates
        </button>
        {candidates.map((candidate) => {
          return (
            <div key={Math.random()}>
              <table>
                <tbody>
                  <tr>
                    <td className="p-2">{candidate.name}</td>
                    <td className="p-2">{candidate._CandidateAddress}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Proposal;

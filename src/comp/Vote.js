import React from "react";
import * as ReactBootStrap from "react-bootstrap";
import { useState } from "react";

function Vote({ contract, account, provider }) {
  const [showVote, setShowVote] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleVote = () => {
    setShowVote(!showVote);
  };

  const submitVote = async (e) => {
    e.preventDefault();
    const voterId = document.getElementById("voterId").value;
    const voterName = document.getElementById("voterName").value;
    const candidateAddress = document.getElementById("candidateAddress").value;
    
    if (voterId && voterName && candidateAddress) {
      setLoading(true);
      const signer = contract.connect(provider.getSigner());
      await signer.SetVote(voterId, voterName, account.toString(), candidateAddress);
      console.log("Voted Successfully");
      alert("Voted!");
      window.location.reload();
      setShowVote(false);
    } else {
      alert("Please fill all input fields");
    }
  };

  return (
    <div>
      <br />
      <div>
        <button
          onClick={toggleVote}
          disabled={!account}
          className="btn btn-dark text-light"
        >
          Vote For Candidate!
        </button>
      </div>
      <br />
      {showVote && (
        <form onSubmit={submitVote}>
          <div className="mt-3">
            <p className="h5">Voter Address: {account}</p>
          </div>
          <div className="form-group">
            <label>Aadhar Number</label>
            <input type="text" id="voterId" className="form-control" />
          </div>
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" id="voterName" className="form-control" />
          </div>
          <div className="form-group">
            <label>Candidate Address</label>
            <input
              type="text"
              id="candidateAddress"
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-dark mt-2">
            {!loading ? (
              "Vote Now"
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
    </div>
  );
}

export default Vote;

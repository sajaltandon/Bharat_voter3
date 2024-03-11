import React from "react";
import { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";

function Sec({ contract, account, provider }) {
  const [loading, setLoading] = useState(false);

  const SetCandidate = async (e) => {
    e.preventDefault();
    const address = document.getElementById("address").value;
    const name = document.getElementById("name").value;
    if (address && name) {
      console.log(address);
      await contract.SetCandidate(address, name);
      console.log("Set!");
      window.location.reload();
      setLoading(true);
    } else {
      alert("Please fill input fields");
    }
  };

  return (
    <div className="pb-3">
      <form onSubmit={SetCandidate}>
        <div className="form-group p-2">
          <label>Address</label>
          <input
            type="text"
            placeholder="Address"
            id="address"
            disabled={!account}
            className="form-control"
          />
        </div>

        <div className="form-group p-2">
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            disabled={!account}
            className="form-control"
          />
        </div>
        <button
          type="submit"
          disabled={!account}
          className="btn btn-dark mx-2 mt-2"
        >
          {!loading ? (
            "Set Candidate"
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
    </div>
  );
}

export default Sec;

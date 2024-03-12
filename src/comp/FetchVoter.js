import React from "react";
import { useState, useEffect } from "react";

function FetchVoter({ contract, account, provider }) {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const fetchVoters = async () => {
      const fetchedVoters = await contract.getVoter();
      console.log(fetchedVoters);
      setVoters(fetchedVoters);
    };

    contract && fetchVoters();
  }, [contract]);

  return (
    <div>
      <p className="text-dark h3">Voters Information</p>
      {voters.map((voter) => {
        return (
          <div key={Math.random()}>
            <table>
              <tbody>
                <tr className="p-2">
                  {/* <td>{voter.Id.toString()}</td> */}
                  <td className="p-2">Voter: {voter.name} </td>
                  <td className="p-2">Voter Address: {voter.voterAddress} </td>
                  <td className="p-2">Voted To: {voter.candidateAddress} </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default FetchVoter;

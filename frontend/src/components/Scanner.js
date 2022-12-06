import React from "react";
import QRCode from "react-qr-code";
// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import Scanner from './Scanner';
import Navigation from './NavBar';
import { Nav } from "react-bootstrap";

export default function Verifier() {
  const styles = {
    root: {
      color: "#2C1752",
      fontFamily: "sans-serif",
      textAlign: "center"
    },
    title: {
      color: "#7B3FE4"
    }
  };
  // update with your contract address
  const deployedContractAddress = "0x6dfB476c7801492Cda68275Ed575aD8B217397b6";

  // more info on query based requests: https://0xpolygonid.github.io/tutorials/wallet/proof-generation/types-of-auth-requests-and-proofs/#query-based-request
  const qrProofRequestJson = {
    id: "c811849d-6bfb-4d85-936e-3d9759c7f105",
    typ: "application/iden3comm-plain-json",
    type: "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
    body: {
      transaction_data: {
        contract_address: deployedContractAddress,
        method_id: "b68967e2",
        chain_id: 80001,
        network: "polygon-mumbai"
      },
      reason: "cgpa",
      scope: [
        {
          id: 1,
          circuit_id: "credentialAtomicQuerySig",
          rules: {
            query: {
              allowed_issuers: ["*"],
              req: {
                CGPA: {
                  $gt: [8]
                }
              },
              schema: {
                url:
                  "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/29c53162-86e2-49c2-b7e8-33dffb3cdcbb.json-ld",
                type: "CGPACredential"
              }
            }
          }
        }
      ]
    }
  };
  return (

    <div><center>
      <div style={styles.root}>
        <h2 style={styles.title}>CGPA</h2>

        <div>
          <QRCode
            size={256}
            value={JSON.stringify(qrProofRequestJson)}
            viewBox={`0 0 256 256`}
          />
        </div>
        <br />

        <p>
          Polygonscan:{" "}
          <a
            href={`https://mumbai.polygonscan.com/token/${deployedContractAddress}`}
            target="_blank"
          >
            View contract
          </a>
        </p>
      </div></center>
    </div>
  )
}









import './App.css';
import QRCode from "react-qr-code";
import Verifier from './components/Verifier.js';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Scanner from './components/Scanner';
import Navigation from './components/NavBar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Verify from './Verification';


function App() {

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
    <BrowserRouter>
      <Navigation />

      <div><center>
        <div>
          <Link to={'/scanner'} style={{ textDecoration: 'none' }}>
            <Button className='button' variant="contained" color="success"  >
              QRCode
            </Button>
          </Link>
          {/* <Button variant="contained" color="success" >
              QRCode
            </Button> */}
          <br /><br /><br />
          {/* <Link to={`Verify`} >
            <Button variant="contained" color="success" >Proceed</Button>
          </Link> */}


          {/* <Verify /> */}

        </div>
        <Link to={`Verify`} >
          <Button className='button' variant="contained" color="success" >Proceed</Button>
        </Link>
      </center>
      </div>


      <Routes>

        <Route path="/scanner" element={
          <Scanner />
        } />

        <Route path='/Verify' element={<Verify />}></Route>

      </Routes>
    </BrowserRouter>

  );
}

export default App;

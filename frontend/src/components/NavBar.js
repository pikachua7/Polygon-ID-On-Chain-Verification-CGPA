import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import styles from '../styles.css';
const Navigation = ({ web3Handler, account }) => {
    const path = window.location.pathname;;
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

        <Navbar className="navbar navbar-dark bg-dark" fixed='top' style={{ height: '70px' }} >


            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Navbar.Brand>
                            <Link to={"/"}>
                                <img src='https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg' width="40" height="40" className="" alt="" color="#FFFFFF" /></Link>
                            {/* NFTDocs */}
                        </Navbar.Brand>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                        >

                        </IconButton>
                        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                            Verify for Students
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

        </Navbar >
    )
}
export default Navigation;




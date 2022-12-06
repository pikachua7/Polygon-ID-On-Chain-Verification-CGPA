import { useState, useEffect } from "react";
import { Buffer } from 'buffer';
import { ethers } from 'ethers';
import { db1 } from "./firebaseConfig";
import './verification.css';
import qr2 from "./qr2.png";

const crypto = require('crypto');
let account;

export default function Verify() {

    const [message, setMessage] = useState('');
    const [singleDoc, setSingleDoc] = useState({});
    const [status, setStatus] = useState(0)
    const [wallet, setWallet] = useState('')
    //const [account, setAccount] = useState('')

    const web3Handler = async () => {
        //fetch account from metamask wallet
        //it will return array of accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        //setAccount(accounts[0])
        account = accounts[0];

        console.log(account);
        //get provider from metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        //set signers
        const signer = provider.getSigner()
    }

    // const web3Handler = async () => {


    //     //fetch account from metamask wallet
    //     //it will return array of accounts
    //     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //     //setAccount(accounts[0])
    //     const account = accounts[0];
    //     console.log(account);
    //     setWallet()
    //     //get provider from metamask
    //     const provider = new ethers.providers.Web3Provider(window.ethereum)
    //     //set signers
    //     const signer = provider.getSigner()

    // }


    // console.log(wallet);

    const fetch = () => {
        console.log("inside")
        db1.collection("Results")
            .doc(account)
            .get()
            .then((snapshot) => {
                if (snapshot) {
                    setSingleDoc(snapshot.data());
                }
            });

    }
    console.log(singleDoc)

    const onUploadFile = async (event) => {

        console.log('File is Uploading');
        event.preventDefault();
        const uploadedfile = { file: event.target.files[0] };


        console.log(uploadedfile);

        const file1 = event.target.files[0];
        console.log(file1);

        const reader = new window.FileReader()
        console.log(reader);
        reader.readAsArrayBuffer(file1);
        fetch();

        reader.onloadend = () => {

            const buffer = Buffer(reader.result);
            console.log(buffer);
            // const hash = crypto.createHash('sha256')
            // const message = hash.update(buffer).digest('hex');
            // console.log(message);
            // setMessage('');



        }
    }

    // const onSubmitFormVerifyMessage = async (event, hash, sigHash) => {
    //     console.log(hash);
    //     console.log(sigHash);
    //     console.log('You proceeded to Verify Message');
    //     // event.preventDefault();
    //     // if (window?.ethereum) {
    //     //     //const signerAddress = await ethers.utils.verifyMessage(message, signatureHash);
    //     //     //setSignerAddress(signerAddress);
    //     // }
    //     // else {
    //     //     alert('Browser wallet connection not Supported!');
    //     // }

    //     //(message === hash) ? setStatus(1) : setStatus(0)


    // }
    const onSubmitFormVerifyMessage = async (event) => {
        console.log(singleDoc.hash);
        console.log(singleDoc.signedHash);
        console.log('You proceeded to Verify Message');
        // event.preventDefault();
        // if (window?.ethereum) {
        //     //const signerAddress = await ethers.utils.verifyMessage(message, signatureHash);
        //     //setSignerAddress(signerAddress);
        // }
        // else {
        //     alert('Browser wallet connection not Supported!');
        // }

        //(message === hash) ? setStatus(1) : setStatus(0)

        setStatus(1)
    }

    return (
        <div>
            <center>

                <h1>Welcome! </h1>
                <h4>{singleDoc.hash}</h4>
                <h4>{singleDoc.signedHash}</h4>
                <h3> To verify your documents, fill the form below:</h3>

                <label htmlFor=""><h4>Enter your Marksheet: </h4></label>
                <input type="file"
                    name="marksheet"
                    className="form-control"
                    onChange={(e) => onUploadFile(e)}

                />
                {/* , singleDoc.hash, singleDoc.signedHash */}
                <p></p>

                <button className="button1" onClick={(event) => onSubmitFormVerifyMessage(event, singleDoc.hash, singleDoc.signedHash)}>Verify</button>
                &nbsp;

                <button className="button1" onClick={web3Handler} >Connect Wallet</button>

                <p></p>
                <strong><small><h3>Verification :</h3> </small></strong>

                <pre>
                    <code>

                        {JSON.stringify({
                            isVerified: (status === 1) ? 'Verified✅' : 'Discrepated!!❌'
                        }, null, " ")

                        }


                        {status === 1 ? <img src={qr2} /> : <></>}

                    </code>
                </pre>


            </center>
        </div>
    )
}
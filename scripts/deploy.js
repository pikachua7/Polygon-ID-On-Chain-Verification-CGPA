async function main() {
  //const verifierContract = "CGPA";
  const verifierContract = "CGPA";
  const verifierName = "ERC20zkAirdrop";
  const verifierSymbol = "zkERC20";
  const CGPA = await ethers.getContractFactory(verifierContract);
  const cgpa = await CGPA.deploy();

  await cgpa.deployed();
  console.log(verifierName, " tx hash:", cgpa.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

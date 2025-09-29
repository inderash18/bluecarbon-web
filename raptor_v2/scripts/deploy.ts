import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const CarbonCreditToken = await ethers.getContractFactory("CarbonCreditToken");

  // Deploy contract, passing the deployer as owner
  const token = await CarbonCreditToken.deploy(deployer.address);

  // No need to call token.deployed() in ethers v6
  console.log("✅ CarbonCreditToken deployed at:", token.target); // in v6, 'target' has the contract address
  console.log("👤 Owner address:", deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
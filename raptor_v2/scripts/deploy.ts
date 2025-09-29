import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();

  // Get the contract factory
  const CarbonCreditToken = await ethers.getContractFactory("CarbonCreditToken");

  // Correct way to pass constructor argument in ethers v6:
  const token = await CarbonCreditToken.deploy([owner.address]); // wrap in array

  await token.waitForDeployment(); // ethers v6 uses waitForDeployment

  console.log("✅ CarbonCreditToken deployed successfully!");
  console.log("📜 Contract Address:", token.target);
  console.log("👤 Owner Address:", owner.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});